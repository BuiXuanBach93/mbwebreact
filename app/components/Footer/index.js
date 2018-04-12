import React from 'react';
import styled from 'styled-components';
import {LINK_USER_GUIDE, LINK_FAQ, FORBIDDEN_ITEM, TERM_OF_USE, PRIVACY_POLICY, PERSONAL_INFORMATION} from 'containers/App/constants'

const Wrapper = styled.div`
    width: 100%;
    text-align : center;
    padding-top :30px;
    background: #f2f2f2
`;

const RowDiv = styled.div`
  width: 100%;
  margin-bottom :10px;
`;

const ItemLeftDiv = styled.div`
    width : 45%;
    display :inline-block;
    font-size: small;
    text-align: left;
    height : 50px;
    background: white;
    padding-top: 17px;
    padding-left: 10px;
    margin-right:5px;
    margin-bottom:${prop => prop.margin_bottom};
    font-weight:bold;
`;

const ItemRightDiv = styled.div`
    width : 45%;
    display :inline-block;
    font-size: small;
    text-align: left;
    height : 50px;
    background: white;
    padding-top: 17px;
    padding-left: 10px;
    margin-left : 5px;
    margin-bottom:${prop => prop.margin_bottom};
    font-weight:bold;
`;

const CopyRightDiv = styled.div`
    padding:10px;
    font-size: small;
    margin-top: 30px;
`;

const A = styled.a`
    color: inherit;
    text-decoration: inherit;
`;

class Footer extends React.Component {
   render() {
    return (
      <Wrapper>
        <RowDiv>
          <ItemLeftDiv>
            <A href={LINK_USER_GUIDE}>ご利用ガイド</A>
          </ItemLeftDiv>
          <ItemRightDiv>
            <A href={LINK_FAQ}>よくあるお問い合わせ</A>
          </ItemRightDiv>
        </RowDiv>
        <RowDiv>
          <ItemLeftDiv>
            <A href={FORBIDDEN_ITEM}>禁止投稿物・禁止行為</A>
          </ItemLeftDiv>
          <ItemRightDiv>
            <A href={TERM_OF_USE}>利用規約</A>
          </ItemRightDiv>
        </RowDiv>  
        <RowDiv>
          <ItemLeftDiv>
            <A href={PRIVACY_POLICY}>プライバシーポリシー</A>
          </ItemLeftDiv>
          <ItemRightDiv>
            <A href={PERSONAL_INFORMATION}>運営会社</A>
          </ItemRightDiv>
        </RowDiv> 
        <CopyRightDiv>
          <a>Copyright 	&copy;2017 Benefit One Inc. All rights reserved.</a>
        </CopyRightDiv>
      </Wrapper>
        
    );
  }
}

export default Footer;
