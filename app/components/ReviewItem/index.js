import React, { Component } from 'react';
import styled from 'styled-components';
import NormalImg from 'components/Img';
import Avatar from './Avatar'
import Utils from '../../utils/Utils'
import Colors from '../../colors'

const TAG = 'ReviewItem'

class ReviewItem extends Component {
    constructor(props) {
        super(props);
        // console.log(TAG + '>Constructor>Props', props)
        this.state = {
            reviewData: props.reviewData
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(TAG + '>ComponentWillReceiveProps>NextProps', nextProps)
        this.setState({ reviewData: nextProps.reviewData })
    }

    render() {
        let { reviewData } = this.state
        if (!this.state.reviewData) {
            return null
        }

        var imgSrc = (reviewData.fromShmUser) ? reviewData.fromShmUser.avatar : null

        var nickName = (reviewData.fromShmUser) ? (reviewData.fromShmUser.nickName + 'さん') : null;
        var reviewTypeText = '良い'
        if (reviewData.userRevRate === 'FAIR')
            reviewTypeText = '普通'
        else if (reviewData.userRevRate === 'BAD')
            reviewTypeText = '悪い'
        else reviewTypeText = '良い'
        var postType = (reviewData.shtTalkPurc && reviewData.shtTalkPurc.shmPost && reviewData.shtTalkPurc.shmPost.postType === 'SELL') ? '出品者：' : 'リクエスト者：'
        var title = postType + nickName + '  ' + '評価：' + reviewTypeText

        var reviewContent = reviewData.userRevCont
        
        var dateTime = reviewData.createdAtTxt

        return (
            <PostWrapper>
                <DivTitle>{title}</DivTitle>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Avatar img={imgSrc} background_color={Colors.grayBackground} />
                    <LeftTriangle />
                    <DivContent>
                        <div style={{ marginRight: 7}}>
                            <DivText>{reviewContent}</DivText>
                            <DivText style={{ color: '#a1a1a1' }}>{dateTime}</DivText>
                        </div>
                        <div>
                            <Img src={require("../../img/ic_arrow_right.png")} alt="" />
                        </div>
                    </DivContent>
                </div>
            </PostWrapper>
        );
    }
}

const PostWrapper = styled.div`
  width:100%;
  padding: 10px 10px 10px 10px;
  background:#f2f2f2;
`;

const DivTitle = styled.div`
  margin-left: 80px;
  margin-bottom: 3px;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Img = styled(NormalImg) `
  width: 10px;
  height:20px;
  object-fit: cover;
  z-index: -1;
`;

const LeftTriangle = styled.div`
  margin-top: 19px;
  margin-left: 10px;
  width: 0px;
  height: 0px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 12px solid white;
`;

const DivContent = styled.div`
  border-radius: 7px; 
  background: white;
  min-height: 50px;
  flex: 1;
  display: flex;
  flex-direction: row;
  padding: 5px 10px 5px 10px;
  justify-content: space-between;
  align-items: center;
`;

const DivText = styled.div`
  font-size: 14px;
  word-break: break-all
`;

export default ReviewItem