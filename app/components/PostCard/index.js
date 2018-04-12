import React, { Component } from 'react';
import styled from 'styled-components';
import NormalImg from 'components/Img';
import Utils from '../../utils/Utils'

class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: props.postData
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log("NextProps", nextProps)
        this.setState({ postData: nextProps.postData })
    }

    render() {
        let { postData } = this.state
        if (!this.state.postData) {
            return null
        }

        var postStatus = null
        switch (postData.postSellStatus) {
            case 'TEND_TO_SELL':
                postStatus = <DivPostStatusInProgress src={require('../../img/ic_post_status_in_process.png')} alt="react-boilerplate" />
                break;
            case 'SOLD':
                postStatus = <DivPostStatusSold src={require('../../img/ic_post_status_sold.png')} alt="react-boilerplate" />
                break;
            default:
                break;
        }

        var imgSrc = postData.postThumbnailImages[0];
        if (!imgSrc) {
            imgSrc = require('../../img/img-no-image.png');
        }

        var imgType = null
        var postType = null
        var postColor = null;
        if (postData.postType === 'SELL') {
            imgType = require('../../img/tabbar_sell.png')
            postType = '出品'
            postColor = '#cc3a2f'
        }
        else {
            imgType = require('../../img/tabbar_buy.png')
            postType = 'リクエスト'
            postColor = '#0098aa'
        }
        var price = (postData.postPrice !== undefined) ? Utils.japanCurrency(postData.postPrice) : ''

        return (
            <PostWrapper>
                <DivImg >
                    <PostImg src={imgSrc} alt="react-boilerplate" />
                </DivImg>
                {postStatus}
                <DivContent>
                    <DivPostName>{postData.postName}</DivPostName>
                    <DivAddr>{postData.postAddrTxt}</DivAddr>
                    <div style={{ marginTop: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <DivPrice>{price}</DivPrice>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <DivPrice style={{ color: postColor, fontWeight: 'normal', marginRight: 10 }}>{postType}</DivPrice>
                            <div style={{ height: '25px', width: '23px' }}>
                                <PostImg src={imgType} alt="react-boilerplate" />
                            </div>
                        </div>
                    </div>
                </DivContent>
            </PostWrapper>
        );
    }
}

const PostWrapper = styled.div`
  width:100%;
  position: relative;
  display: flex;
  flex-direction:row;
  background:white;
`;

const DivImg = styled.div`
  height: 110px;
  width: 110px;
`;

const DivContent = styled.div`
 flex:1;
 padding:10px 10px 10px 10px;
`;

const PostImg = styled(NormalImg) `
  width: 100%;
  height:100%;
  object-fit: cover;
  z-index: -1;
`;

const DivPostStatusInProgress = styled(NormalImg) `
position: absolute;
width:50px;
height:18px;
left: -2px;
top: 5px;
`;

const DivPostStatusSold = styled(NormalImg) `
position: absolute;
width:70px;
height:40px;
left: 0px;
top: 0px;
`;

const DivAddr = styled.div`
  font-size: 14px;
  color: #606060;
`;

const DivPostName = styled.div`
  line-height: 1.5em;
  height: 3em;      
  font-weight: bold;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const DivPrice = styled.div`
  font-size: 13px;
  font-weight:bold;
`;

export default PostCard