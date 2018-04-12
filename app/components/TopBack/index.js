import React from 'react';
import styled from 'styled-components'
import NormalImg from 'components/Img';


class TopBack extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Div>
        <Div_Back onClick={this.props.onClickBackButton}>
           <Back src={require("../../img/iconsBack.png")} alt="react-boilerplate - Logo" /> 
        </Div_Back>
        <Title >{this.props.title}</Title>
      </Div>
    );
  }
}

const Div_Back = styled.div`
    height:100%;
    float:left;
    display: flex;
    align-items: center;
`;

const  Div = styled.div`
  width:100%;
  height:50px;
  display:flex;
  border-bottom: 1px solid #e2e1e7 ; 
  align-items:center;
  text-align:center;
`;

const Back = styled(NormalImg)`
  padding: 12px 12px 12px 12px
  width: 50px;
  height:50px;
`;

const Title = styled.p`
    width: 100%;
    text-align: center;
    padding-right:30px;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export default TopBack;
