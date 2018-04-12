import React, { Component } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Checkbox from 'components/Checkbox'
import { connect } from 'react-redux';
import { handleClickSearchPost, resetParamListPost } from '../App/actions';
import { makeSelectListPostSearchData, makeSelectLoading } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import request from 'utils/request';
import PostPreview from 'components/PostPreview';
import NormalImg from 'components/Img';
import Constants from '../../constants'
import Loader from 'components/Loader'
import { BASE_PREFIX } from 'containers/App/constants';


const TAG = 'SearchHashTag'

class SearchHashTag extends Component {

    data = null
    size = 10
    page = 0
    params = null

    constructor(props) {
        super(props)
        // console.log(TAG + '>Constructor>Props', props);
        this.state = {
            listPostData: null,
            totalPages: 0,
            textSearch: props.location.state.textSearch,
            loading: true,
            postType: props.location.state.postType
        }
    }

    componentWillReceiveProps(newProps) {
        // console.log(TAG + '>componentWillReceiveProps>NewProps', newProps);
        var total = 0
        if (newProps.listPostData) {
            this.data = (this.page === 0) ? newProps.listPostData.content : this.data.concat(newProps.listPostData.content)
            total = newProps.listPostData.totalPages
        }
        this.setState({ listPostData: this.data, totalPages: total, loading: newProps.loading })
    }

    resetData() {
        this.size = 10
        this.page = 0
    }

    handleClickBack = () => {
        this.props.router.goBack();
    };

    handleClickViewMore = () => {
        this.page += 1
        this.params = { ...this.params, page: this.page }
        this.props.searchPost(this.params)
    }

    handleClickChooseSell = () => {
        console.log("choose sell");
        this.setState({ postType: 'SELL' });
        this.resetData()
        this.fetchDataSearchPost('SELL')
    };


    handleClickChooseBuy = () => {
        console.log("choose buy");
        this.setState({ postType: 'BUY'});
        this.resetData()
        this.fetchDataSearchPost('BUY')
    }

    handleClickLogo = () => {
        this.props.router.push(BASE_PREFIX + '/sp')
        this.props.handleResetParamListPost()
    }

    handleClickSearchPost = () => {
        this.props.router.push(BASE_PREFIX + '/sp/search-post');
    };

    fetchDataSearchPost(postType) {
        // console.log(TAG + '>Props', this.props);
        var addrDistrictId = null
        var addrProvinceId = null
        var categoryIdSuper = null
        var isSameCompany = null
        var page = this.page
        var postType = postType
        var price = null
        var size = this.size
        var sortField = 'createdAtDesc'
        var textSearch = this.state.textSearch
        var bannerId = this.props.location.state.bannerId ? this.props.location.state.bannerId : null

        this.params = {
            addrDistrictId: addrDistrictId, addrProvinceId: addrProvinceId, categoryIdSuper: categoryIdSuper, isSameCompany: isSameCompany,
            page: page, postType: postType, price: price, size: size, sortField: sortField, textSearch: textSearch, bannerId: bannerId
        }

        this.props.searchPost(this.params)
    }
    componentDidMount() {
        this.fetchDataSearchPost(this.state.postType)
    }

    render() {

        var sellButtonClassName = 'button-inactive';
        if (this.state.postType == 'SELL') {
            sellButtonClassName = 'button-active';
        }
        var buyButtonClassName = 'button-inactive';
        if (this.state.postType == 'BUY') {
            buyButtonClassName = 'button-request-active';
        }

        var liClass = "postItem";
        const listPostLi = (this.state.listPostData && this.state.listPostData.length > 0) ? this.state.listPostData.map((item, i) =>
            <Li className={liClass} key={item.postId} onClick={() => { this.props.router.push(BASE_PREFIX + '/sp/post-detail/' + item.postId) }}>
                <PostPreview shmPost={item} />
            </Li>
        ) : (this.state.listPostData ? (<NoDataDiv>
            <TextNoData> 該当する投稿情報はございませんでした</TextNoData>
        </NoDataDiv>) : null);

        const viewMoreButton = (this.page < this.state.totalPages - 1) ? <ViewMoreDiv>
            <button className='button-view-more' onClick={this.handleClickViewMore}>もっと見る</button>
        </ViewMoreDiv> : null

        return (
            <div>
                <Loader loading={this.state.loading} />
                <Header handleClickLogo={this.handleClickLogo} handleClickSearchPost={() => { this.handleClickSearchPost() }} />
                <OptionSearchDiv>
                    <SellBuyDiv>
                        <SellButton className={sellButtonClassName} onClick={this.handleClickChooseSell}>出品アイテム</SellButton>
                        <BuyButton className={buyButtonClassName} onClick={this.handleClickChooseBuy}>リクエスト</BuyButton>
                    </SellBuyDiv>
                </OptionSearchDiv>
                <UL style={{ padding: 10, background: '#f2f2f2' }}>
                    {listPostLi}
                </UL>
                {viewMoreButton}
                <Footer />
            </div>
        );
    }
}
export function mapDispatchToProps(dispatch) {
    return {
        searchPost: (params) => {
            dispatch(handleClickSearchPost(params))
        },
        handleResetParamListPost: () => { dispatch(resetParamListPost()) }
    };
}
const mapStateToProps = createStructuredSelector({
    listPostData: makeSelectListPostSearchData(),
    loading: makeSelectLoading()
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchHashTag);

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
padding-top: 15px;
background: #f2f2f2
`;

const SellBuyDiv = styled.div`
width: 100%;
display: inline-block;
margin-top:5px;
margin-bottom: 15px;
`;

const OptionSearchDiv = styled.div`
margin-top:0px;
padding:10px;
background:#f2f2f2;
`;

const SellButton = styled.button`
width: 50%;
height:40px;
background-color: white;
color: #696969;
border: 1px solid #a1a1a1;
border-bottom-left-radius: 7px;
border-top-left-radius: 7px;
border-right-style: none;
font-size:14px;
outline: none;
`;

const BuyButton = styled.button`
width: 50%;
height:40px;
background-color: white;
color: #696969;
border: 1px solid #a1a1a1;
border-bottom-right-radius: 7px;
border-top-right-radius: 7px;
border-left-style: none;
font-size:14px;
outline: none;
`;

const LineDiv = styled.div`
width:100%;
height: 1px
background: #a1a1a1
`;

const NoDataDiv = styled.div`
background: #f2f2f2;
height: 65px;
width: 100%;
padding: 10px 0px 10px 0px;
`;

const TextNoData = styled.div`
fontSize:13px;
background: white
text-align : center;
padding: 10px 10px 10px 10px
`;
