import React, { Component } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import CategoryChildSearch from 'components/CategoryChildSearch';
import { connect } from 'react-redux';
import { loadListSubCategory } from '../App/actions';
import { makeSelectListSubCategory,makeSelectSubCategorySearch, makeSelectListCategory} from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import IcArrowRight from 'img/ic_arrow_right.png';
import { BASE_PREFIX } from 'containers/App/constants';

const TAG = 'SearchSubCategory'

class SearchSubCategory extends Component {
    constructor(props){
        super(props);
        // console.log(TAG +'>Props', props);
        this.parentId = props.routeParams.parentId;
        this.state={
            categories:[{categoryId:1,categoryName:'first'},{categoryId:2,categoryName:'second'},{categoryId:3,categoryName:'third'}],
            category : {categoryId:0,categoryName:'すべて'}
        }
    }

    handleClickBack =() =>{
        this.props.router.goBack();
    };

    handleClickIconSearchPost =() =>{
       //click search icon on hearder => do nothing 
    };

    handleClickChildCategory = (id, categoryChild) => {
        var categoryParent = this.props.location.state.categoryParent
        this.props.router.push({ pathname: BASE_PREFIX+ '/sp/search-post', state: { categoryParent: categoryParent, categoryChild: categoryChild }});
    }

    componentWillMount() {
        this.props.loadListSubCategory(this.parentId);
    }

    componentWillReceiveProps(newProps){
        // console.log('newProps', newProps)
    }

    handleClickChooseCategory =() =>{
        console.log("Category");
        
    };

    render() {
         const {listSubCategorytData} = this.props;
        //  console.log("listSubCategory render: ",listSubCategorytData);
         if(!listSubCategorytData){
             return null;
         }
        return (
            <div>
                <Header  handleClickSearchPost={()=>{this.handleClickIconSearchPost()}} />
                <OptionSearchDiv>
                    <CategoryChildSearch categories = {listSubCategorytData} handleClickChildCategory={(id,name)=>{this.handleClickChildCategory(id,name)}}/>
                </OptionSearchDiv>    
                <Footer />
            </div>
        );
    }
}
export function mapDispatchToProps(dispatch) {
    return {
        loadListSubCategory: (parentId) => {
            dispatch(loadListSubCategory(parentId));
        }
    };
}
const mapStateToProps = createStructuredSelector({
    listSubCategorytData: makeSelectListSubCategory(),
    category : makeSelectSubCategorySearch(),
    listCategorytData: makeSelectListCategory(),
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchSubCategory);

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