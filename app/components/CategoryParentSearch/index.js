import React, { Component } from 'react';
import styled from 'styled-components';
import {API_GET_CATEGORIES} from 'containers/App/constants';
import IcArrowRight from 'img/ic_arrow_right.png';

const AppWrapper = styled.div`
  width:100%;
`;

const Ul = styled.ul`
  margin: 0;
  padding-left: 0px;
  padding-right: 0px;
`;

const Li = styled.li`
    
`;

const ChosenLabel = styled.label`
    font-size:12px;
    font-weight:bold;
`;

const HeaderLabel = styled.label`
    font-size:15px;
    font-weight:bold;
`;

const ChooseDiv = styled.div`
    width: 100%
    height:45px;    
    margin-bottom:5px;
    padding-top: 8px;
    padding-left: 10px;
    display: inline-flex;
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

class CategoryParentSearch extends Component {
    constructor(props) {
        super(props);
        this.categories = this.props.categories;
        this.state = {categories:[], category:{categoryId: 0, categoryName: 'すべて'}};
    }

render() {
    if(!this.categories){
        return;
    }
        const categoriesElement = this.categories.map((item, i) => {
            return <Li key={item.categoryId}>
                <ChooseDiv  onClick={()=> {this.props.handleClickParentCategory(item.categoryId, item.categoryName);}}>
                        <ChosenLabelDiv>
                            <ChosenLabel>{item.categoryName}</ChosenLabel>
                        </ChosenLabelDiv>
                        <ArrowRightDiv>
                            <ImgArrowRight src={IcArrowRight} alt = ""/>
                        </ArrowRightDiv>
                </ChooseDiv>
            </Li>
            });
        return (
            <AppWrapper>
                    <Ul>
                        {categoriesElement}
                    </Ul>
            </AppWrapper>
        );
    }
}
export default CategoryParentSearch;