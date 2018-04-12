import React, { Component } from 'react';
import TopBack from 'components/TopBack';
import Header from 'components/Header';
import ImageSlider from 'components/ImageSlider';
import PostInfo from 'components/PostInfo';
import Footer from 'components/Footer';
import ImageViewer from 'components/ImageViewer';
import { connect } from 'react-redux';
import { loadPost, resetParamListPost } from '../App/actions';
import { makeSelectPostData, makeSelectLoading } from 'containers/App/selectors';
import { BASE_PREFIX } from 'containers/App/constants';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import request from 'utils/request';
import Loader from 'components/Loader'
import { LINK_APP_STORE_IOS, LINK_GOOGLE_PLAY, LINK_SCHEMA } from 'containers/App/constants';

class PostDetail extends Component {
    constructor(props) {
        super(props)
        // console.log('Props', props)
        this.state = {
            postData: null,
            isOpenImageViewer: false,
            index: 0,
            loading: true
        }
    }

    componentWillReceiveProps(newProps) {
        // console.log("newprops: ", newProps);
        if (newProps.postData && newProps.params.postId == newProps.postData.postId)
            this.setState({ postData: newProps.postData, loading: newProps.loading })
    }

    componentDidMount() {
        this.props.onLoadPostDetail(this.props.params.postId);
    }

    handleClickUserInfo = () => {
        var userId = (this.state.postData.shmUser) ? this.state.postData.shmUser.id : 1
        this.props.router.push(BASE_PREFIX+'/sp/user-profile/' + userId)
    }

    handleClickHashTag = (textSearch) =>{
        this.props.router.push({ pathname: BASE_PREFIX+ '/sp/list-posts', state: {textSearch: textSearch, postType: this.state.postData.postType} });
    }

    handleClickBackButton = () => {
        this.props.router.goBack()
    }

    handleClickLogo = () => {
        this.props.router.push(BASE_PREFIX+'/sp')
        this.props.handleResetParamListPost()
    }

    handleClickSearchPost =() =>{
        this.props.router.push(BASE_PREFIX+'/sp/search-post');
    };

    handleCloseImageViewer = () =>{
    }

    handleOpenImageViewer(index){
        var postId = (this.state.postData.postId) ? this.state.postData.postId : 0
        this.props.router.push({pathname: BASE_PREFIX+'/sp/photo/' + postId, state: {index: index, images: this.state.postData.postOriginalImages}});
        this.setState({ isOpenImageViewer: true, index: index})
    }

    handleClickOpenApp = () => {
        
        var ua = navigator.userAgent;
        var isAndroid = ua.indexOf('Android') > -1;
        var isIos = ua.indexOf('iPhone') > -1 ;

        if(isIos){
            window.location.href = LINK_APP_STORE_IOS;
            console.log(LINK_APP_STORE_IOS);
        }
        if(isAndroid){
            window.location.href = LINK_GOOGLE_PLAY;
            console.log(LINK_GOOGLE_PLAY);
        }
    }
    
    render() {
        const { postData } = this.state
        if (!postData) {
            return null;
        }
        var downloadText = (postData.postSellStatus !== 'SOLD') ? 'アプリで問い合わせる' : 'アプリをダウンロード'

        return (
            <Div id='post_detail_container'>
                <Loader loading={this.state.loading} />
                <Header handleClickLogo={this.handleClickLogo} handleClickSearchPost={() => { this.handleClickSearchPost() }} />
                <DivContent>
                    <ImageSlider index={this.state.index} images={postData.postThumbnailImages} openImageViewer={(index) => { this.handleOpenImageViewer(index) }} />
                    <PostInfo data={postData} onClickUserInfo={this.handleClickUserInfo} onClickSearchHashtag={this.handleClickHashTag}/>
                </DivContent>
                <div style={{ marginBottom: 100 }}>
                    <Footer />
                </div>
                <DivFloatButton>
                    <FloatButton onClick={this.handleClickOpenApp}>{downloadText}</FloatButton>
                </DivFloatButton>
            </Div>
        );

    }
}
export function mapDispatchToProps(dispatch) {
    return {
        onLoadPostDetail: (postId) => { dispatch(loadPost(postId)); },
        handleResetParamListPost: () => { dispatch(resetParamListPost()) }
    };
}
const mapStateToProps = createStructuredSelector({
    postData: makeSelectPostData(),
    loading: makeSelectLoading()
})
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

const Div = styled.div`
width:100%;
background:#f2f2f2;
`;

const DivContent = styled.div`
width: 100%;
background: #f2f2f2;
padding: 10px
`;

const DivFloatButton = styled.div`
height: 70px;
width: 100%;
position: fixed;
bottom: 0px;
padding: 10px 40px 10px 40px;
background: rgba(145, 145, 145, 0.9)
`;

const FloatButton = styled.a`
padding: 10px 10px 10px 10px;
height: 50px;
background:#cc3a2f
color: white;
font-size: 14px
display:flex;
align-items: center;
justify-content: center;
border-radius: 7px;
text-decoration:none;
`;
