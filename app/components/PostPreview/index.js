import React, { Component } from 'react';
import styled from 'styled-components';
import {LikedImg } from './Img';
import IconLiked from './ic_post_favorite_off.png'
import NoImage from './img-no-image.png';
import Utils from 'utils/Utils'
const PostWrapper = styled.div`
  width:100%;
  background:white;
`;

const DivImg = styled.div`
  position: relative;
  margin-bottom: 5px ;
`;

const PostImg = styled.img`
    width: 100%;
    height:165px;
    object-fit: cover;
    z-index: -1;
`;

const DivAddr = styled.div`
  width:100%;
  height:25px;
  paddingTop: 3px;
  paddingBottom: 3px;
  background-color: black;
  opacity: 0.5;
  position: absolute;
  bottom: 0px;
  color: white;
  font-size:14px;
  padding-left:10px;
  font-weight:bold;
`;

const DivPostName = styled.div`
  line-height: 1.5em;
  height: 3em;       /* height is 2x line-height, so two lines will display */
  overflow: hidden;
  padding-left:10px;
  font-weight:bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const DivBottom = styled.div`
  width:100%;
  background:white;
  height:30px;
`;

const DivPrice = styled.div`
  width:75%;
  float:left;
  display: inline-block;
  padding-left:10px;
  font-size : 13px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PostProcessStatusImg = styled.img`
    width: 40%;
    position: absolute;
    z-index: 0;
    margin-top : 5px;
    margin-left : -3px;
    display:${prop => prop.display};
`;

const PostSoldStatusImg = styled.img`
    width: 45%;
    position: absolute;
    z-index: 0;
    display:${prop => prop.display};
`;

const TAG = 'PostPreview'

class PostPreview extends Component {
    constructor(props) {
        super(props);
        // console.log(TAG + '>Constructor>Props', props)
        this.shmPost = this.props.shmPost;
    }

    render() {

        var pageWidth = window.innerWidth;
        var imageHeight = pageWidth/2 - 15;
        var imgSrc = this.shmPost.postThumbnailImages[0];
        var postStatus = this.shmPost.postSellStatus;
        var processStatusDisplay = 'none';
        var soldStatusDisplay = '';
        // if(postStatus === 'TEND_TO_SELL' || postStatus === 'IN_CONVERSATION'){
        //     processStatusDisplay = 'block';
        // }else{
        //     processStatusDisplay = 'none';
        // }
        if(postStatus === 'SOLD'){
            soldStatusDisplay = 'block';
        }else{
            soldStatusDisplay = 'none';
        }
        if (!imgSrc) {
            imgSrc = NoImage;
        }

        var price = (this.shmPost.postPrice !== undefined) ? Utils.japanCurrency(this.shmPost.postPrice) : ''
        return (
            <PostWrapper>
                <DivImg >
                    <PostProcessStatusImg style={{ display: processStatusDisplay }} src={require('../../img/ic_post_status_in_process.png')} alt="" />
                    <PostSoldStatusImg style={{ display: soldStatusDisplay }} src={require('../../img/ic_post_status_sold.png')} alt="" />
                    <PostImg style={{ height:imageHeight }} src={imgSrc} alt="" />
                    <DivAddr>{this.shmPost.postAddrTxt}</DivAddr>
                </DivImg>

                <DivPostName>{this.shmPost.postName}</DivPostName>
                <DivBottom>
                    <DivPrice>{price}</DivPrice>
                </DivBottom>
            </PostWrapper>
        );
    }
}
export default PostPreview;