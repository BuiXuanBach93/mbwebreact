import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import A from './A';
import { Img, ImgSearch } from './Img';
import Banner from 'img/logo.png';
import SearchIcon from 'img/ic_search.png'
import messages from './messages';
import styled from 'styled-components';
import {browserHistory} from 'react-router';
import {BASE_PREFIX} from 'containers/App/constants';

class Header extends Component {

  constructor(props) {
    super(props);
  }

  handleClickChooseCategory =() =>{
    browserHistory.push(BASE_PREFIX+'/sp');
 };

 handleClickSearchPost =() =>{
  browserHistory.push(BASE_PREFIX+'/sp/search-post');
};


  render() {
    return (
      <Wrapper>
        <div>
          <ImageSearchDiv onClick={() => {
            this.props.handleClickSearchPost();
          }}>
            <ImgSearch src={SearchIcon} alt="" />
          </ImageSearchDiv>
          <div onClick={() => {this.props.handleClickLogo()}}>
            <Img src={Banner} alt="react-boilerplate - Logo" />
          </div>
        </div>
        {(this.props.fromScreen === 'searchPost') ? null : <LineDiv />}
      </Wrapper>

    );
  }
}
export default Header;


const Wrapper = styled.div`
padding:10px 0px 10px 0px;
background: white;
`;

const LineDiv = styled.div`
width:100%;
height: 1px
background: #a1a1a1
margin-top: 10px
`;

const ImageSearchDiv = styled.div`
float: right;
padding: 10px 20px 10px 20px;
`;

