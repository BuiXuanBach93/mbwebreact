import React, { Component } from 'react';
import styled from 'styled-components';
import P from './P';
import Avatar from './Avatar'
import ReviewBar from 'components/ReviewBar';
import Colors from '../../colors'
import Utils from '../../utils/Utils'
import Constants from '../../constants'
import UserInfo from '../UserInfo'

const lineHeight = 20;
const maxLine = 7;
const maxHeight = 140;

class PostInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numberOfLines: 0,
            isViewMore: true,
            maxHeight: 'none'
        }
    }

    getPostStatus() {
        var postStatus = null
        var { postSellStatus } = this.props.data
        var { postCtrlStatus } = this.props.data
        if (postCtrlStatus === Constants.postStatus.SUSPENDED)
            postStatus = Constants.postStatus.SUSPENDED
        else postStatus = postSellStatus
        return postStatus
    }

    renderStatusButton() {
        var postStatusText = null
        if (this.getPostStatus())
            postStatusText = Constants.postStatusText[this.getPostStatus()]

        if (this.getPostStatus() === Constants.postStatus.PUBLIC) {
            return <DivStatusButton style={{ background: '#f49037' }}>{postStatusText}</DivStatusButton>
        }
        if (this.getPostStatus() === Constants.postStatus.SUSPENDED) {
            return <DivStatusButton style={{ background: '#ffffff', color: '#fff600' }}>{postStatusText}</DivStatusButton>
        }
        if (this.getPostStatus() === Constants.postStatus.IN_CONVERSATION || this.getPostStatus() === Constants.postStatus.TEND_TO_SELL) {
            postStatusText = Constants.postStatusText[Constants.postStatus.IN_CONVERSATION]
            //return <DivStatusButton style={{ background: '#cc3a2f' }}>{postStatusText}</DivStatusButton>
            return <DivStatusButton style={{ background: '#f49037' }}>{postStatusText}</DivStatusButton>
        }
        return (
            <DivStatusButton style={{ background: '#404040' }}>{postStatusText}</DivStatusButton>
        )

    }

    componentDidMount() {
        if (document.getElementById('post_description')) {
            var divHeight = document.getElementById('post_description').offsetHeight
            var lines = divHeight / lineHeight;
            console.log('NumberOfLines', lines)
            if (lines > maxLine)
                this.setState({ mumberOfLines: lines, maxHeight: maxHeight + 'px' })
        }
    }

    handleViewMoreClick = () =>{
        if (document.getElementById('post_description')) {
            var isViewMore = !this.state.isViewMore
            if (this.state.isViewMore)
                document.getElementById('post_description').style.maxHeight = 'none'
            else document.getElementById('post_description').style.maxHeight = maxHeight + 'px'

            this.setState({ isViewMore: isViewMore })
        }
    }

    handleHashTagClick = (event) =>{
        var target = event.target
        var tagName = target ? target.tagName : null
        if(tagName === 'SPAN'){
        var textSearch = target ? target.innerText : null    
        console.log('Text', textSearch)
        this.props.onClickSearchHashtag(textSearch)
        }
    }

    renderViewMoreButton() {
        console.log('IsViewMore', this.state.isViewMore)
        var text = 'タップ し て 全文 を 表示'
        if (this.state.mumberOfLines > maxLine) {
            if (!this.state.isViewMore) {
                text = 'タップして隠す'
                console.log('Render view less')
            }
            else console.log('Render view more')

            return (<ViewMoreDiv onClick={this.handleViewMoreClick}>
                <ViewMoreBtn>{text}</ViewMoreBtn>
            </ViewMoreDiv>)

        }
        else
            return null
    }

    render() {
        var price = this.props.data.postPrice ? Utils.japanCurrency(this.props.data.postPrice) : null ;
        var time = (this.props.data.createdAt) ? Utils.formatDate(this.props.data.createdAt) + ' 掲載' : ''
        var categoryName = (this.props.data.postCategoryParent && this.props.data.postCategory) ?
            this.props.data.postCategoryParent.categoryName + '\n＞' + this.props.data.postCategory.categoryName : ''

        var postName = this.props.data.postName
        // for (var i = 0; i < this.props.data.postName.length; i++) {
        //     postName += this.props.data.postName[i]
        //     if (i === 35 && this.props.data.postName.length > 36) {
        //         postName += '...'
        //         break;
        //     }
        // }

        var postDescription = this.props.data.postDescription
        var listHashTag = this.props.data.postDescription ? postDescription.match(Constants.regEx.hashTags) : null
        console.log('HashTag', listHashTag)
        if (listHashTag)
            for (var i = 0; i < listHashTag.length; i++) {
                postDescription = postDescription.replace(listHashTag[i], "<span style=color:#471900;font-weight:bold>" + listHashTag[i] + "</span>")
            }
        return (
            <Div>
                <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                    <P padding="0px" margin_top="0px" size="20px" word_wrap="break-word" font_weight='bold'>{postName}</P>
                    <P text_color={Colors.grayText} size="14px">{this.props.data.postAddrTxt}</P>
                    <P text_color={Colors.bloodText} size="14px" white_space='pre'>{categoryName}</P>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                        {this.renderStatusButton()}
                        <a style={{ fontSize: 20, fontWeight: 'bold' }}>{price}</a>
                    </div>
                    <P id="post_description" overflow="hidden" max_height={this.state.maxHeight} line_height={lineHeight + 'px'} margin_top="15px" size="14px"
                        clear="both" word_wrap="break-word" dangerouslySetInnerHTML={{ __html: postDescription }} onClick={this.handleHashTagClick}></P>
                    {this.renderViewMoreButton()}
                    <P margin_top="10px" size="13px" text_color={Colors.grayText} >{time}</P>
                    <P size="13px" text_color={Colors.grayText} >ID: {this.props.data.postId}</P>
                </div>
                <div style={{ marginTop: '30px', paddingTop: 10, background: '#f2f2f2' }}>
                    <UserInfo data={this.props.data} onClickUserInfo={this.props.onClickUserInfo} />
                </div>
            </Div>
        );
    }
}
export default PostInfo;

const Div = styled.div`
background: white 
width:100%;
padding-top: 10px;
`;

const DivStatusButton = styled.div`
color: white
background: #404040;
padding : 3px 15px 3px 15px;
font-size: 14px;
display:flex;
align-items: center;
justify-content: center;
`

const ViewMoreDiv = styled.div`
width: 100%;
margin-top: 10px;
text-align:center;
`;

const ViewMoreBtn = styled.button`
height:25px;
background-color: #404040;
color: black;
padding: 0px 15px 0px 15px;
border: 1px solid #404040;
border-radius: 5px;
font-size: 14px;
color: white;
outline: none;
`;