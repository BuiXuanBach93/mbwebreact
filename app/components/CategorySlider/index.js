import React, { Component } from 'react';
import styled from 'styled-components';
import {API_GET_CATEGORIES_INCLUDE_ALL, API_GET_CATEGORY_SETTING, MAINTAIN_URL} from 'containers/App/constants';
const AppWrapper = styled.div`
  width:100%;
  margin-top: 10px ;
  height:23px;
`;

const Ul = styled.ul`
  font-size: 14px;
  color : #606060;
  list-style: none;
  white-space:nowrap;
  margin: 0;
  width: 100%;
  max-height: 30em;
  overflow: auto;
  padding: 0px 1em;
  padding-left: 0px;
  padding-right: 0px;
`;

const Li = styled.li`
    display: inline-block; 
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom:1px;
    border-bottom: 1px solid #a1a1a1;
`;

const ActiveDiv = styled.div`
    font-weight:bold;
`;

const BorderBottDiv = styled.div`
    width:100%;
    height:1px;
    margin-top : -15px;
`;

class CategorySlider extends Component {
    constructor(props) {
        super(props);
        this.categories = this.props.categories;
        var activeIndex = this.props.categoryId ? this.props.categoryId/1000 : 0;
        this.state = {categories:[], categoryId:0, activeIndex: activeIndex};
    }
    
 componentWillReceiveProps(newProps) {
        if (newProps.categories) {
            this.setState({ categories: newProps.categories })
        }
}
    
componentDidMount() {
    var ctx = this;
    var cateOrigins = [];
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
            if(data[i].categoryPublishType != 'BUY'){
                cateOrigins.unshift(data[i]);    
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
        ctx.setState({ categories: cateOrigins, activeIndex: defaultIndex});
    });
       
    });
  }

render() {
        const categoriesElement = this.state.categories.map((item, i) => {
            var activeClass="";
            if (this.state.activeIndex === i) {
                activeClass = 'active';
            }
            return <Li key={item.categoryId} className={activeClass}>
                <ActiveDiv onClick={()=> 
                    {
                        this.setState({activeIndex : item.index});
                        this.props.handleClickCategory(item.categoryId, item.categorySettingId, item.cateType);
                    }}>
                    <a>{item.categoryName}</a>
                </ActiveDiv>
            </Li>
            });
        return (
            <AppWrapper>
                    <Ul>
                        {categoriesElement}
                    </Ul>
                    <BorderBottDiv>
                    </BorderBottDiv>
            </AppWrapper>
        );
    }
}
export default CategorySlider;