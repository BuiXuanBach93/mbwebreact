import React, { Component } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import CategoryParentSearch from 'components/CategoryParentSearch';
import { connect } from 'react-redux';
import { loadListCategory, handleClickCategorySearch, resetParamListPost, resetOptionSearch } from '../App/actions';
import { makeSelectListCategory} from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import IcArrowRight from 'img/ic_arrow_right.png';
import { browserHistory } from 'react-router';
import { BASE_PREFIX } from 'containers/App/constants';

const TAG = 'SearchCategory'

class SearchCategory extends Component {
    constructor(props){
        super(props)
        // console.log(TAG +'>Props', props);
    }

    handleClickBack =() =>{
        this.props.router.goBack();
    };

    handleClickLogo = () => {
        this.props.router.push(BASE_PREFIX+'/sp')
        this.props.handleResetParamListPost()
    }

    handleClickIconSearchPost =() =>{
        this.props.handleClickReset()
        this.props.router.push(BASE_PREFIX+'/sp/search-post');
    };             

    handleClickParentCategory = (id, name) => {
        this.props.handleSelectCategory({ parentCategoryId: id, parentCategory: name })
        this.props.router.goBack();
    }

    componentWillMount() {
        this.props.loadListCategory();
    }

    componentWillReceiveProps(newProps){
        // console.log('newProps', newProps)
    }

    render() {
         const {listCategorytData} = this.props;
        //  console.log("prop: ",this.props);
         if(!listCategorytData){
             return null;
         }
        return (
            <div>
                <Header handleClickSearchPost={()=>{this.handleClickIconSearchPost()}}  handleClickLogo={this.handleClickLogo}/>
                <OptionSearchDiv>
                    <CategoryParentSearch categories = {listCategorytData} handleClickParentCategory={(id,name)=>{this.handleClickParentCategory(id,name)}}/>
                </OptionSearchDiv>    
                <Footer />
            </div>
        );
    }
}
export function mapDispatchToProps(dispatch) {
    return {
        loadListCategory: (evt) => {dispatch(loadListCategory());},
        handleSelectCategory: (category) => {dispatch(handleClickCategorySearch(category))},
        handleResetParamListPost: () =>{ dispatch(resetParamListPost())},
        handleClickReset: (evt) => { dispatch(resetOptionSearch()) }
    };
}
const mapStateToProps = createStructuredSelector({
    listCategorytData: makeSelectListCategory(),
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchCategory);

const OptionSearchDiv = styled.div`
margin-top:0px;
padding:10px;
background:#f2f2f2;
`;

const Label = styled.label`
margin-top:10px;
margin-bottom:5px;
font-size:12px;
`;

const ChosenLabel = styled.label`
font-size:12px;
font-weight:bold;
`;

const ChooseDiv = styled.div`
width: 100%
height:45px;    
margin: 5px 0;
padding-top: 8px;
padding-left: 15px;
display: inline-flex;
border: 1px solid;
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