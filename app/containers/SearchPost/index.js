import React, { Component } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { BUY_POST, SELL_POST } from './constants';
import { resetOptionSearch, inputTextSearch, resetParamListPost, selectPostTypeSearch } from '../App/actions';
import { makeSelectCategoryData, makeSelectChildAddressData, makeSelectParentAddressData,makeSelectTextSearchData, makeSelectPostTypeData } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import request from 'utils/request';
import { BASE_PREFIX } from 'containers/App/constants';

const TAG = 'SearchPost'

class SearchPost extends Component {

    data = ''
    size = 10
    page = 0

    constructor(props) {
        super(props)
        // console.log(TAG + '>Constructor>Props', props);

        var categoryParentText = (props.selectCategoryData) ? props.selectCategoryData.parentCategory : 'すべて'
        var categoryParentId = (props.selectCategoryData) ? props.selectCategoryData.parentCategoryId : 0

        var addrProvinceText = (props.selectParentAddressData) ? props.selectParentAddressData.parentAddress : 'すべて'
        var addrDistrictText = (props.selectChildAddressData) ? props.selectChildAddressData.childAddress : 'すべて'
        var addrProvinceId = (props.selectParentAddressData) ? props.selectParentAddressData.parentAddressId : 0
        var addrDistrictId = (props.selectChildAddressData) ? props.selectChildAddressData.childAddressId : 0

        var textSearch = (props.inputTextSearchData)? props.inputTextSearchData : ''
        var searchType = (props.selectPostTypeData) ? props.selectPostTypeData : 'SELL'

        this.state = {
            category: { categoryParent: categoryParentText, categoryChild: 'すべて', categoryParentId: categoryParentId, categoryChildId: 0 },
            address: { addrProvince: addrProvinceText, addrDistrict: addrDistrictText, addrProvinceId: addrProvinceId, addrDistrictId: addrDistrictId },
            searchType: searchType,
            textSearch: textSearch
        }        
    }

    handleClickBack = () => {
        this.props.handleClickReset()
        this.props.router.goBack()
    };

    handleClickIconSearchPost = () => {
        //click search icon on hearder => do nothing 
    };
    
    handleClickLogo = () => {
        this.props.router.push(BASE_PREFIX+ '/sp')
        this.props.handleClickReset()
        this.props.handleResetParamListPost()
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
        // console.log(TAG + '>ComponentWillReceiveProps>newProps', newProps)
        var categoryParentText = (newProps.selectCategoryData) ? newProps.selectCategoryData.parentCategory : 'すべて'
        var categoryParentId = (newProps.selectCategoryData) ? newProps.selectCategoryData.parentCategoryId : 0

        var addrProvinceText = (newProps.selectParentAddressData) ? newProps.selectParentAddressData.parentAddress : 'すべて'
        var addrDistrictText = (newProps.selectChildAddressData) ? newProps.selectChildAddressData.childAddress : 'すべて'
        var addrProvinceId = (newProps.selectParentAddressData) ? newProps.selectParentAddressData.parentAddressId : 0
        var addrDistrictId = (newProps.selectChildAddressData) ? newProps.selectChildAddressData.childAddressId : 0

        var textSearch = (newProps.inputTextSearchData)? newProps.inputTextSearchData : ''
        var searchType = (newProps.selectPostTypeData) ? newProps.selectPostTypeData : 'SELL'

        this.setState({
            category: { categoryParent: categoryParentText, categoryChild: 'すべて', categoryParentId: categoryParentId, categoryChildId: 0 },
            address: { addrProvince: addrProvinceText, addrDistrict: addrDistrictText, addrProvinceId: addrProvinceId, addrDistrictId: addrDistrictId },
            textSearch: textSearch,
            searchType: searchType
        })
    }

    handleClickChooseSell = () => {
        console.log("choose sell");
        this.setState({ searchType: 'SELL' });
        this.props.selectPostTypeSearch('SELL')
        this.props.handleInputTextSearch(this.state.textSearch)
    };


    handleClickChooseBuy = () => {
        console.log("choose buy");
        this.setState({ searchType: 'BUY' });
        this.props.selectPostTypeSearch('BUY')
        this.props.handleInputTextSearch(this.state.textSearch)
    }

    handleClickChooseCategory = () => {
        this.props.router.push(BASE_PREFIX+ '/sp/search-category');
        this.props.handleInputTextSearch(this.state.textSearch)
    };

    handleClickCategoryItem = (categoryText) => {
        this.setState({ category: categoryText })
    }

    handleClickSubCategoryItem = (subCategoryText) => {
        this.setState({ subCategory: subCategoryText })
    }

    handleClickChooseAddress = () => {
        this.props.router.push(BASE_PREFIX+ '/sp/search-address');
        this.props.handleInputTextSearch(this.state.textSearch)
    }


    handleClickOK = () => {
        var addrDistrictId = this.state.address.addrDistrictId
        var addrProvinceId = this.state.address.addrProvinceId
        var addrDistrictText = this.state.address.addrDistrict
        var addrProvinceText = this.state.address.addrProvince
        var categoryIdSuper = this.state.category.categoryParentId
        var categoryParentText = this.state.category.categoryParent
        var categoryChildText = this.state.category.categoryChild
        var isSameCompany = false
        var page = this.page
        var postType = this.state.searchType
        var price = 1
        var size = this.size
        var sortField = 'createdAtDesc'
        var textSearch = this.state.textSearch

        var params = {
            addrDistrict: addrDistrictText, addrProvince: addrProvinceText, categoryChild: categoryChildText, categoryParent: categoryParentText,
            addrDistrictId: addrDistrictId, addrProvinceId: addrProvinceId, categoryIdSuper: categoryIdSuper, isSameCompany: isSameCompany,
            page: page, postType: postType, price: price, size: size, sortField: sortField, textSearch: textSearch
        }

        this.props.router.push({ pathname: BASE_PREFIX+ '/sp/search-results', state: params });
        this.props.handleInputTextSearch(textSearch)
    };


    handleClickCancel = () => {
        this.props.handleClickReset()
        this.setState({textSearch: ''})
    }

    onChangeTextSearch(evt)  {
        console.log(TAG + '>OnChangeTextSearch', evt.target.value)
        this.setState({ textSearch: evt.target.value })
    }

    render() {
        var sellButtonClassName = 'button-inactive';
        if (this.state.searchType == 'SELL') {
            sellButtonClassName = 'button-active';
        }
        var buyButtonClassName = 'button-inactive';
        if (this.state.searchType == 'BUY') {
            buyButtonClassName = 'button-request-active';
        }

        var categoryText = (this.state.category.categoryParentId !== 0) ? this.state.category.categoryParent + '＞' + 'すべて' : 'すべて'
        var addressText = (this.state.address.addrProvinceId !== 0) ? this.state.address.addrProvince + '>' + this.state.address.addrDistrict : 'すべて'

        return (
            <div>
                <Header handleClickSearchPost={() => { this.handleClickIconSearchPost() }} fromScreen='searchPost' handleClickLogo={this.handleClickLogo}/>
                 <InputSearchDiv>
                    <ImgBack onClick={this.handleClickBack} src={require("../../img/btn_nav_back.png")} alt="" />
                    <SearchTextInput id='textSearch' type='text' placeholder='キーワード・ハッシュタグから探す' value={this.state.textSearch}
                        onChange={(evt) => this.onChangeTextSearch(evt)}></SearchTextInput>
                </InputSearchDiv> 
                <OptionSearchDiv>
                    <SellBuyDiv>
                        <SellButton className={sellButtonClassName} onClick={this.handleClickChooseSell}>出品アイテム</SellButton>
                        <BuyButton className={buyButtonClassName} onClick={this.handleClickChooseBuy}>リクエスト</BuyButton>
                    </SellBuyDiv>
                    <Label>カテゴリ選択</Label>
                     <ChooseDiv onClick={this.handleClickChooseCategory}>
                        <ChosenLabelDiv>
                            <ChosenLabel>{categoryText}</ChosenLabel>
                        </ChosenLabelDiv>
                         <ArrowRightDiv>
                            <ImgArrowRight src={require("../../img/ic_arrow_right.png")} alt="" />
                        </ArrowRightDiv>
                    </ChooseDiv>
                    <Label2>エリア選択</Label2>
                    <ChooseDiv onClick={this.handleClickChooseAddress}>
                        <ChosenLabelDiv>
                            <ChosenLabel>{addressText}</ChosenLabel>
                        </ChosenLabelDiv>
                        <ArrowRightDiv>
                            <ImgArrowRight src={require("../../img/ic_arrow_right.png")} alt="" />
                        </ArrowRightDiv>
                    </ChooseDiv> 
                    <ButtonDiv>
                        <button className='button-search' style={{marginRight:5, marginLeft: 0}} onClick={this.handleClickCancel}>クリア</button>
                        <button className='button-search' onClick={this.handleClickOK}>検索</button>
                    </ButtonDiv>
                </OptionSearchDiv>
                <Footer />
            </div>
        );
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        handleClickReset: (evt) => { dispatch(resetOptionSearch()) },
        handleInputTextSearch: (text) => { dispatch(inputTextSearch(text)) },
        handleResetParamListPost: () =>{ dispatch(resetParamListPost())},
        selectPostTypeSearch : (postType) => {dispatch(selectPostTypeSearch (postType))}
    };
}
const mapStateToProps = createStructuredSelector({
    selectCategoryData: makeSelectCategoryData(),
    selectParentAddressData: makeSelectParentAddressData(),
    selectChildAddressData: makeSelectChildAddressData(),
    inputTextSearchData: makeSelectTextSearchData(),
    selectPostTypeData: makeSelectPostTypeData()
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchPost);

const SearchTextInput = styled.input`
    width: 70%
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
    border-bottom: 2px solid #a1a1a1;
    background: #f2f2f2;
`;
const ImgBack = styled.img`
    margin-right:25px;
    height: 25px;
    width: 15px;
    margin-left: 25px;
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

const Label = styled.label`
    margin-top:10px;
    margin-bottom:5px;
    font-size:12px;
    color: #696969
`;

const Label2 = styled.label`
margin-top:10px;
margin-bottom:5px;
font-size:12px;
color: #696969
`;

const ChosenLabel = styled.label`
    font-size:12px;
    font-weight:bold;
`;

const ChooseDiv = styled.div`
    width: 100%
    height:50px;    
    margin: 5px 0;
    padding-top: 10px;
    padding-left: 15px;
    display: inline-flex;
    border: 1px solid #696969;
    box-sizing: border-box;
    background:white;
`;

const ChosenLabelDiv = styled.div`
    width : 90%;
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


