import React, { Component } from 'react';
import styled from 'styled-components';
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

class AddressParentSearch extends Component {
    constructor(props) {
        super(props);
        this.addresses = this.props.addresses;
        this.state = {addresses:[], address:{addressId: 0, areaName: 'すべて'}};
    }

render() {
    if(!this.addresses){
        return;
    }
    // console.log("addessssssss ", this.addresses);
        const addressesElement = this.addresses.map((item, i) => {
            return <Li key={item.addressId}>
                <ChooseDiv onClick={()=> {this.props.handleClickParentAddress(item.addressId, item.areaName);}}>
                        <ChosenLabelDiv>
                            <ChosenLabel>{item.areaName}</ChosenLabel>
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
                        {addressesElement}
                    </Ul>
            </AppWrapper>
        );
    }
}
export default AddressParentSearch;