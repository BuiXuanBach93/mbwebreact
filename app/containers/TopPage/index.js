import React, { Component } from 'react';
import Header from 'components/Header';
import CategorySlider from 'components/CategorySlider';
import PostPreview from 'components/PostPreview';
import Footer from 'components/Footer';
import { connect } from 'react-redux';
import { loadListPost, handleClickCategory, handleClickViewMore, resetParamListPost, handleClickSwitchPostType, postLoaded } from '../App/actions';
import { makeSelectListPostData, makeSelectCategoryId, makeSelectTopPageSize, makeSelectPostType, makeSelectCategorySettingId, makeSelectLoading } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { POST_TYPE_REQUEST, POST_TYPE_SELL, POST_INIT_NUNMBER, POST_LOAD_NUMBER } from './constants';
import { LINK_APP_STORE_IOS,LINK_APP_STORE_ANDROID, LINK_GOOGLE_PLAY, API_GET_BANNER_DATA, API_GET_CATEGORY_SETTING,API_GET_CATEGORIES_INCLUDE_ALL, MAINTAIN_URL } from 'containers/App/constants';
import { BASE_PREFIX } from 'containers/App/constants';
import Loader from 'components/Loader'
import BannerSlider from 'components/BannerSlider'
import Simplert from 'react-simplert'

import request from 'utils/request';

const windowHeight = window.innerHeight;
const windowWith = window.innerWidth;

const TAG = 'TopPage'

class TopPage extends Component {

    preHeight = 0;
    data = null
    categoryId = 0;
    postType = POST_TYPE_SELL;

    constructor(props) {
        super(props)
        this.state = {
            categoryId: this.props.categoryId ? this.props.categoryId : 0,
            categories:[],
            activeIndex:0,
            categorySettingId: this.props.categorySettingId ? this.props.categorySettingId : 0,
            categoryType:'',
            postType: this.props.postType ? this.props.postType : POST_TYPE_SELL,
            bannerData: [],
            topPageSize : POST_INIT_NUNMBER,
            listPostData:null,
            isShowSwButton:'',
            hideBtCount:0,
            yOfBanner:0,
            loading: true,
            showSimplert: false
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentWillMount() {
        this.fetchCategotySetting();
        this.getFirstCategoriesData();
    }

    componentDidMount(){
        this.fetchBanner()
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.listPostData)
            this.data = newProps.listPostData
        this.setState({ listPostData: this.data, loading: newProps.loading})
    }
    
    handleScroll(event) {
        var shButtonElement = document.getElementById("switchButton");
        var shButtonRect = null;
        if(shButtonElement){
            shButtonRect = shButtonElement.getBoundingClientRect();
        }

        var bannerDivElement = document.getElementById("bannerDiv");
        var bannerDivRect = null;
        if(bannerDivElement){
            bannerDivRect = bannerDivElement.getBoundingClientRect();
        }

        var listPostDivElement = document.getElementById("listPost");
        var listPostDivRect = null;
        if(listPostDivElement){
            listPostDivRect = listPostDivElement.getBoundingClientRect();
        }

        if(bannerDivRect && shButtonRect && bannerDivRect.top <= shButtonRect.bottom){
            if(this.state.hideBtCount == 0){
                var count = this.state.hideBtCount + 1;
                this.setState({hideBtCount:count});
                this.setState({yOfBanner:bannerDivRect.top});
            }
            this.setState({isShowSwButton:'none'});
        }
        if(bannerDivRect && listPostDivRect && ((bannerDivRect.top >= this.state.yOfBanner && this.state.yOfBanner != 0) || listPostDivRect.top > 90)){
            this.setState({isShowSwButton:''});    
        }
        
    }

    handleClickSearchPost =() =>{
        this.props.router.push(BASE_PREFIX+'/sp/search-post');
    };

    handleClickLogo = () => {
        this.props.handleResetParamListPost()
        this.fetchCategotySetting();
        this.setState({ categoryId: 0, loading: true });
        this.data = null;
    }

    handleCloseAlert() {
        console.log('handleCloseAlert')
        this.setState({ showSimplert: false})
    }

    handleClickSwitchPostType = () => {
        var postTypeSearch;
        if (this.state.postType == POST_TYPE_SELL) {
            this.setState({ postType: POST_TYPE_REQUEST });
            postTypeSearch = POST_TYPE_REQUEST;
        }
        if (this.state.postType == POST_TYPE_REQUEST) {
            this.setState({ postType: POST_TYPE_SELL });
            postTypeSearch = POST_TYPE_SELL;
        }
        // scroll to top page
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        // reload data
        this.getCategoriesData();
        this.props.onClickCategoryId(this.state.categoryId, this.state.categorySettingId, this.state.categoryType);
        this.props.onClickViewMore(POST_INIT_NUNMBER);
        this.props.onLoadTopPage(postTypeSearch);
        this.props.handleClickSwitchPostType(postTypeSearch);
    };

    handleClickCategory = (originId, settingId, cateType) => {
        if(cateType == 'ORIGIN'){
            this.setState({ categoryId: originId,categorySettingId: 0, categoryType:cateType, topPageSize: POST_INIT_NUNMBER, isShowSwButton: '', loading: true});
            this.props.onClickCategoryId(originId, 0, cateType);
            this.props.onClickViewMore(POST_INIT_NUNMBER);  
            this.props.onLoadTopPage(this.state.postType);
        }else if(cateType == 'SETTING'){
            this.setState({ categoryId: 0,categorySettingId: settingId, categoryType:cateType, topPageSize: POST_INIT_NUNMBER, isShowSwButton: '', loading: true});
            this.props.onClickCategoryId(0, settingId, cateType);
            this.props.onClickViewMore(POST_INIT_NUNMBER);  
            this.props.onLoadTopPage(this.state.postType);
        }
            
    }

    handleClickViewMore = () => {
        var currentSize = this.state.topPageSize;
        var nextSize = currentSize + POST_LOAD_NUMBER;
        this.setState({ topPageSize: nextSize });
        this.props.onClickViewMore(nextSize);
        this.props.onLoadTopPage(this.state.postType, this.state.categorySettingId);
    }

    fetchBanner = () => {
        var ctx = this;
        fetch(API_GET_BANNER_DATA)
        .then(function(response) {
        if (response.status === 503) {
            window.open(MAINTAIN_URL,"_self");
        }
        // console.log(response);
            return response.json();
        })
        .then(function(data) {
            ctx.setState({bannerData: data})
        });
        // request(API_GET_BANNER_DATA, null).then((json) => 
        // { 
        //     this.setState({bannerData: json})
        // })
    }

    fetchCategotySetting = () => {
        var ctx = this;
        fetch(API_GET_CATEGORY_SETTING)
        .then(function(response) {
        if (response.status === 503) {
            window.open(MAINTAIN_URL,"_self");
        }
        return response.json();
        }).then(function(data) {
            var categorySettings = data;
        console.log("data = ", categorySettings);
        var cateStDefaultId = 0;
        categorySettings.map((item,i)=>{
            if(item.isDefault && item.isDefault == true){
                cateStDefaultId = item.categorySettingId;
            }
        });
       // console.log("cateStDefaultId = ", cateStDefaultId);
        if(cateStDefaultId > 0){
            ctx.setState({categorySettingId:cateStDefaultId});
        }
        ctx.props.onLoadTopPage(ctx.state.postType, cateStDefaultId);
        });

        // request(API_GET_CATEGORY_SETTING, null).then((json) => 
        // { 
        //     var cateStDefaultId = 0;
        //     var categorySettings = json;
        //     categorySettings.map((item,i)=>{
        //         if(item.isDefault && item.isDefault == true){
        //             cateStDefaultId = item.categorySettingId;
        //         }
        //     });
        //    // console.log("cateStDefaultId = ", cateStDefaultId);
        //     if(cateStDefaultId > 0){
        //         this.setState({categorySettingId:cateStDefaultId});
        //     }
        //     this.props.onLoadTopPage(this.state.postType, cateStDefaultId);
        // })
    }

    getFirstCategoriesData = () => {
        var ctx = this;
        var cateOrigins = [];
        var postType = this.state.postType;
     fetch(API_GET_CATEGORIES_INCLUDE_ALL)
    .then(function(response) {
        if (response.status === 503) {
            window.open(MAINTAIN_URL,"_self");
        }
        return response.json();
    })
    .then(function(data) {
        data.map((item,i)=>{
            item.cateType = 'ORIGIN';
        });
        cateOrigins = data;
        // get category-setting
    fetch(API_GET_CATEGORY_SETTING)
    .then(function(response) {
        if (response.status === 503) {
            window.open(MAINTAIN_URL,"_self");
        }
        return response.json();
    })
    .then(function(data) {
        data.map((item,i)=>{
            item.categoryId = i + 1;
            item.cateType = 'SETTING';
        });
        for(var i = data.length - 1; i >= 0; i--){
            if(!postType || postType == 'SELL'){
                if(data[i].categoryPublishType != 'BUY'){
                    cateOrigins.unshift(data[i]);    
                }
            }
            if(postType && postType == 'BUY'){
                if(data[i].categoryPublishType != 'SELL'){
                    cateOrigins.unshift(data[i]);    
                }
            }
        }
        var defaultIndex = -1;
        var categoryAllIndex = -1;
        cateOrigins.map((item,i)=>{
            if(item.isDefault && item.isDefault == true){
                defaultIndex = i;
            }
            if(item.categoryId === 0){
                categoryAllIndex = i;
            }
            item.index = i;
        });
        if(defaultIndex === -1){
            defaultIndex = categoryAllIndex;
        }
        ctx.setState({ categories: cateOrigins});
        console.log("categories:", cateOrigins);
    });
       
    });
    }

    getCategoriesData = () => {
        var ctx = this;
        var cateOrigins = [];
        var postType = this.state.postType;
        console.log("postType", postType);
    // get list categories
     fetch(API_GET_CATEGORIES_INCLUDE_ALL)
    .then(function(response) {
        if (response.status === 503) {
            window.open(MAINTAIN_URL,"_self");
        }
        // console.log(response);
        return response.json();
    })
    .then(function(data) {
        data.map((item,i)=>{
            item.cateType = 'ORIGIN';
        });
        cateOrigins = data;
        // get category-setting
    fetch(API_GET_CATEGORY_SETTING)
    .then(function(response) {
        if (response.status === 503) {
            window.open(MAINTAIN_URL,"_self");
        }
        return response.json();
    })
    .then(function(data) {
        data.map((item,i)=>{
            item.categoryId = i + 1;
            item.cateType = 'SETTING';
        });
        for(var i = data.length - 1; i >= 0; i--){
            if(!postType || postType == 'SELL'){
                if(data[i].categoryPublishType != 'SELL'){
                    cateOrigins.unshift(data[i]);    
                }
            }
            if(postType && postType == 'BUY'){
                if(data[i].categoryPublishType != 'BUY'){
                    cateOrigins.unshift(data[i]);    
                }
            }
        }
        var defaultIndex = -1;
        var categoryAllIndex = -1;
        cateOrigins.map((item,i)=>{
            if(item.isDefault && item.isDefault == true){
                defaultIndex = i;
            }
            if(item.categoryId === 0){
                categoryAllIndex = i;
            }
            item.index = i;
        });
        if(defaultIndex === -1){
            defaultIndex = categoryAllIndex;
        }
        ctx.setState({ categories: cateOrigins});
    });
       
    });
    }

    handleClickOpenAppStore = () => {
        var ua = navigator.userAgent;
        var isAndroid = ua.indexOf('Android') > -1;
        var isIos = ua.indexOf('iPhone') > -1 ;
        if(isIos){
            window.location.href = LINK_APP_STORE_IOS;
        }
        if(isAndroid){
            window.location.href = LINK_APP_STORE_ANDROID;
        }
    }

    handleBannerClick = (isShowAlert, isOpenPostDetail, data) => {
        if (isShowAlert) {
            this.setState({ showSimplert: true, bannerData: [] })
            return
        }
        if (isOpenPostDetail) {
            let postId = data.postId
            this.props.router.push(BASE_PREFIX + '/sp/post-detail/' + postId)
        }
        else {
            let bannerId = data.bannerId ? data.bannerId : 0
            this.props.router.push({ pathname: BASE_PREFIX + '/sp/list-posts', state: { bannerId: bannerId, postType: 'SELL' } });
        }
    }

    render() {
        const { listPostData } = this.state;
        if (!listPostData) {
            return null;
        }
        var displayShowMore = 'block';
        var noPostText = (listPostData.content.length == 0) ?  <NoPostDiv>当該する投稿情報はございませんでした</NoPostDiv>: null
        
        if(listPostData.content.length < POST_INIT_NUNMBER || listPostData.totalPages <=1){
            displayShowMore = 'none';
        }
        var switchText1 = '';
        var switchText2 = '';
        if (this.state.postType == POST_TYPE_REQUEST) {
            switchText1 = '出品投稿'
            switchText2 = '表示'
        }
        if (this.state.postType == POST_TYPE_SELL) {
            switchText1 = 'リクエスト'
            switchText2 = '投稿表示'
        }
        var liClass = "postItem";
        const listPost = listPostData.content;
        const listPostLi = listPost.map((item, i) => {
            return <Li className={liClass} key={item.postId} onClick={() => {
                this.props.router.push(BASE_PREFIX+'/sp/post-detail/' + item.postId);
            }
            }>
                <PostPreview shmPost={item} />
            </Li>
        });

        return (
            <Wrapper>
                <Loader loading={this.state.loading} />
                <Simplert showSimplert={this.state.showSimplert} message='こちらのバナーの掲載は終了いたしました。' type='' onClose={() => this.handleCloseAlert()} disableOverlayClick={true}/>
                <HeaderWrapper>
                    <Header fromScreen='searchPost' handleClickSearchPost={() => { this.handleClickSearchPost() }} handleClickLogo={this.handleClickLogo} />
                    <CategorySlider categories={this.state.categories} categoryId={this.state.categoryId} handleClickCategory={(originId, settingId, cateType) => { this.handleClickCategory(originId, settingId, cateType) }} />
                </HeaderWrapper>
                {(this.state.bannerData && this.state.bannerData.length !== 0) ?
                    < BannerSliderDiv >
                        <BannerSlider bannerData={this.state.bannerData} handleBannerClick={this.handleBannerClick} />
                    </BannerSliderDiv> : null}
                {noPostText}
                <ListPostWrapper id='listPost'>
                    <UL>
                        {listPostLi}
                    </UL>
                </ListPostWrapper>
                <SwitchTypeDiv id='switchButton' onClick={this.handleClickSwitchPostType} style={{ display: this.state.isShowSwButton }}>
                    <ImgSwitch src={require((this.state.postType === 'SELL') ? '../../img/ic_switch_buy.png' : '../../img/ic_switch_sell.png')} alt=''>
                    </ImgSwitch>
                    <SwitchLable1>{switchText1}</SwitchLable1>
                    <SwitchLable2>{switchText2}</SwitchLable2>
                </SwitchTypeDiv>
                <ViewMoreDiv style={{ display: displayShowMore }}>
                    <button className='button-view-more' onClick={this.handleClickViewMore}>もっと見る</button>
                </ViewMoreDiv>
                <BannerDiv id='bannerDiv'>
                    <ImgBanner src={require('../../img/banner-footer.png')} alt=''>
                    </ImgBanner>
                    <BannerButtonDiv>
                        <a onClick={this.handleClickOpenAppStore}>
                            <ImgAppStore src={require('../../img/app_store.png')} alt='' />
                        </a>
                        <a href={LINK_GOOGLE_PLAY} target="_blank">
                            <ImgGooglePlay src={require('../../img/google_play.png')} alt='' />
                        </a>
                    </BannerButtonDiv>
                </BannerDiv>
                <Footer/>
            </Wrapper>
        );
    }
}
export function mapDispatchToProps(dispatch) {
    return {
        onLoadTopPage: (postType, cateStDefaultId) => {
            dispatch(loadListPost(postType, cateStDefaultId));
        },
        onClickCategoryId: (originId, settingId, cateType ) => {
            dispatch(handleClickCategory(originId, settingId, cateType));
        },
        onClickViewMore: (topPageSize) => {
            dispatch(handleClickViewMore(topPageSize));
        },
        handleResetParamListPost: () => { dispatch(resetParamListPost())},
        handleClickSwitchPostType: (postType) => {dispatch(handleClickSwitchPostType(postType))}
    }
}
const mapStateToProps = createStructuredSelector({
    listPostData: makeSelectListPostData(),
    categoryId: makeSelectCategoryId(),
    categorySettingId: makeSelectCategorySettingId(),
    topPageSize: makeSelectTopPageSize(),
    postType: makeSelectPostType(),
    loading: makeSelectLoading()
})
export default connect(mapStateToProps, mapDispatchToProps)(TopPage);

const Wrapper = styled.div`
background: #f2f2f2;
`;

const HeaderWrapper = styled.div`
background: white;
`;

const ListPostWrapper = styled.div`
padding:5px;
width: 100%;
`;

const Li = styled.li`
width: 50%;
display: inline-block;
padding-bottom:10px;

`;

const UL = styled.ul`
margin-top:0px;
padding:5px;
background:#f2f2f2;
margin-bottom: 0px;
padding-bottom:0px;
display: flex;
flex-flow: row wrap;
justify-content: space-between;
`;

const ViewMoreDiv = styled.div`
width: 100%;
text-align:center;
`;

const NoPostDiv = styled.div`
text-align:center;
margin: 10px;
padding: 5px;
background: white;
font-size:14px;
`;


const BannerSliderDiv = styled.div`
margin: 10px 10px 0px 10px;
`;

const ImgBanner = styled.img`
margin-top:10px;
width: 100%;
`;

const ImgAppStore = styled.img`
 paddingRight: 7px;
 width: 140px;
`;

const ImgGooglePlay = styled.img`
paddingLeft: 7px;
 width: 140px;
`;

const BannerDiv = styled.div`
width: 100%;
padding:30px 10px 0px 10px;
position: relative;
background: #f2f2f2;
`;

const SwitchTypeDiv = styled.div`
position: fixed;  
right: 15px;
bottom: 8%;
z-index: 1;
`;

const ImgSwitch = styled.img`
float: right;
width:100px;
`;
const SwitchLable1 = styled.label`
position: absolute;
top: 45%;
color: white;
width: 100%;
text-align: center; 
font-size: 13px;
`;

const SwitchLable2 = styled.label`
position: absolute;
top: 65%;
color: white;
width: 100%;
text-align: center; 
font-size: 13px;
`;

const BannerButtonDiv = styled.div`
position: absolute;
bottom: 40px;
left:10px;
right:10px;
display: flex;
justify-content: center;
flex-direction: row;
`;
