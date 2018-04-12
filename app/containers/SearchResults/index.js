import React, { Component } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Checkbox from 'components/Checkbox'
import { connect } from 'react-redux';
import { handleClickSearchPost, selectSortTypeSearch, selectPostPriceSearch } from '../App/actions';
import { makeSelectListPostSearchData, makeSelectPostPriceData , makeSelectSortTypeData, makeSelectLoading } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import request from 'utils/request';
import PostPreview from 'components/PostPreview';
import NormalImg from 'components/Img';
import Constants from '../../constants'
import DropDown from 'components/DropDown'
import Loader from 'components/Loader'
import { BASE_PREFIX } from 'containers/App/constants';


const TAG = 'SearchResults'

class SearchResults extends Component {

    data = null
    size = 10
    page = 0
    params = null
    sortTypes = ''
    isChecked = false

    constructor(props) {
        super(props)
        // console.log(TAG + '>Constructor>Props', props);
        this.state = {
            listPostData: null,
            totalPages: 0,
            textSearch: props.location.state.textSearch,
            sortValue: props.selectSortTypeData ? Constants.sortTypes[props.selectSortTypeData.index] : Constants.sortTypes[0],
            isChecked: props.selectPostPriceData ? props.selectPostPriceData.value : false,
            loading: true
        }
    }

    resetData() {
        this.size = 10
        this.page = 0
    }

    handleClickBack = () => {
        this.props.router.goBack();
    };

    handleClickIconSearchPost = () => {
        // console.log(TAG + '>handleClickIconSearchPost');
        // this.params = { ...this.params, textSearch: this.state.textSearch }
        // this.props.searchPost(this.params)
        this.props.router.goBack();
    };

    onChangeTextSearch(evt) {
        // console.log(TAG + '>OnChangeTextSearch', evt.target.value)
        // this.setState({ textSearch: evt.target.value })
    }

    onFocusTextSearch() {
        this.props.router.goBack();
    }
    onSelectSortOption(value, i) {
        console.log(TAG + '>OnSelectSortOption',value)
        this.resetData()
        this.params = { ...this.params, sortField: value, page: this.page, size: this.size }
        this.props.searchPost(this.params)
        this.props.selectSortTypeSearch({value: value, index: i})
        this.setState({sortValue: Constants.sortTypes[i]})
    }
    onCheckboxClick(value){
        console.log(TAG + '>HandleCheckboxChange', value)
        var price = (value) ? 0 : 1
        this.params = { ...this.params, price: price, page: this.page, size: this.size }
        this.resetData()
        this.props.searchPost(this.params)
        this.props.selectPostPriceSearch({value: value})
        this.setState({isChecked: value})
    }

    handleClickViewMore = () => {
        this.page += 1
        this.params = { ...this.params, page: this.page}
        this.props.searchPost(this.params)
    }

    componentWillReceiveProps(newProps) {
        console.log(TAG + '>componentWillReceiveProps>NewProps', newProps);
        var total = 0
        if(newProps.listPostData){
            this.data = (this.page === 0) ? newProps.listPostData.content : this.data.concat(newProps.listPostData.content)
            total = newProps.listPostData.totalPages
        }
        this.setState({ listPostData: this.data, totalPages: total, loading: newProps.loading})
    }

    componentDidMount() {
        // console.log(TAG + '>ComponentDidMount>Props', this.props);
        var addrDistrictId = this.props.location.state.addrDistrictId
        var addrProvinceId = this.props.location.state.addrProvinceId
        var categoryIdSuper = this.props.location.state.categoryIdSuper
        var isSameCompany = false
        var page = this.page
        var postType = this.props.location.state.postType
        var price = (this.props.selectPostPriceData && this.props.selectPostPriceData.value) ? 0 : 1
        var size = this.size
        var sortField = this.props.selectSortTypeData ? this.props.selectSortTypeData.value : 'createdAtDesc'
        var textSearch = this.props.location.state.textSearch
        this.params = {
            addrDistrictId: addrDistrictId, addrProvinceId: addrProvinceId, categoryIdSuper: categoryIdSuper, isSameCompany: isSameCompany,
            page: page, postType: postType, price: price, size: size, sortField: sortField, textSearch: textSearch
        }

        this.props.searchPost(this.params)
    }

    render() {
        var liClass = "postItem";
        const listPostLi = (this.state.listPostData && this.state.listPostData.length > 0) ? this.state.listPostData.map((item, i) =>
            <Li className={liClass} key={i} onClick={() => { this.props.router.push(BASE_PREFIX+'/sp/post-detail/' + item.postId) }}>
                <PostPreview shmPost={item} />
            </Li>
        ) : (this.state.listPostData ? (<NoDataDiv>
            <TextNoData> 該当する投稿情報はございませんでした</TextNoData>
        </NoDataDiv>) : null);
        
        const viewMoreButton = (this.page < this.state.totalPages - 1) ? <ViewMoreDiv>
            <button className='button-view-more' onClick={this.handleClickViewMore}>もっと見る</button>
        </ViewMoreDiv> : null

        var categoryText = (this.props.location.state.categoryIdSuper !== 0) ? this.props.location.state.categoryParent + '＞' + 'すべて' : 'すべて'
        var addressText = (this.props.location.state.addrProvinceId !== 0) ? this.props.location.state.addrProvince + '＞' + this.props.location.state.addrDistrict : '全国　出品アイテム'

        return (
            <div>
                 <Loader loading={this.state.loading} />
                <InputSearchDiv>
                    <ImgBack onClick={this.handleClickBack} src={require("../../img/btn_nav_back.png")} alt="" />
                    <SearchTextInput id='textSearch' type='text' placeholder='キーワード・ハッシュタグから探す' value={this.state.textSearch}
                        onChange={(evt) => this.onChangeTextSearch(evt)} onFocus={() => this.onFocusTextSearch()}></SearchTextInput>
                    <div style={{ marginTop: 10, display: 'block', float: 'right' }} onClick={this.handleClickIconSearchPost}>
                        <ImgSearch src={require("../../img/ic_search.png")} alt="" />
                    </div>
                </InputSearchDiv>
                <OptionSearchDiv>
                    <div style={{ padding: 10 }}>
                        <div style={{ fontSize: 12 }}>{categoryText}</div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: 12 }}>{addressText}</div>
                            <div style={{ fontSize: 12 }}>から検索</div>
                        </div>
                    </div>
                    <LineDiv />
                    <div style={{ padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SortDiv>
                            <DropDown value={this.state.sortValue} listItem={Constants.sortTypes} onClickSelectSortType={(value, i) => this.onSelectSortOption(value, i)} />
                        </SortDiv>
                        <div style={{ marginRight: 20, marginTop: 5 }}>
                            <Checkbox value={this.state.isChecked} label='¥ 0のみ表示する' onCheckboxClick={(value) => this.onCheckboxClick(value)} />
                        </div>

                    </div>
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
        selectPostPriceSearch : (postPrice) =>{ dispatch(selectPostPriceSearch(postPrice))},
        selectSortTypeSearch : (sortTypes) =>{ dispatch(selectSortTypeSearch(sortTypes))}     
    };
}
const mapStateToProps = createStructuredSelector({
    listPostData: makeSelectListPostSearchData(),
    selectPostPriceData: makeSelectPostPriceData(),
    selectSortTypeData: makeSelectSortTypeData(),
    loading: makeSelectLoading(),
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);

const SearchTextInput = styled.input`
    width: 65%
    padding: 12px 10px;
    margin: 5px 0;
    display: inline-block;
    border: 1px solid #a1a1a1;
    box-sizing: border-box;
    font-size: 16px;
    outline: none;
`;
const InputSearchDiv = styled.div`
    width: 100%;
    padding-top:15px;
    padding-right:20px;
    background: #f2f2f2;
    border-bottom: 2px solid #a1a1a1;
`;
const ImgBack = styled.img`
    margin-right:25px;
    height: 25px;
    width: 15px;
    margin-left: 25px;
`;
const ArrowRightDiv = styled.div`
    width : 10%;
`;

const ImgArrowRight = styled.img`
    height: 15px;
`;

const ButtonDiv = styled.div`
    text-align : center;
    width :100%;
    margin-top:50px;
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
padding-top: 15px;
background: #f2f2f2
`;

const ImgSearch = styled(NormalImg) `
width: 25px;
height:25px;
`;

const OptionSearchDiv = styled.div`
background: #f2f2f2;
`;

const LineDiv = styled.div`
width:100%;
height: 1px
background: #a1a1a1
`;

const SortDiv = styled.div`
width: 50%;
height:35px;
`
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
