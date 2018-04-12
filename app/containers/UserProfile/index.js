import React, { Component } from 'react';
import H1 from 'components/H1';
import request from 'utils/request';
import UserInfo from '../../components/UserInfo'
import Header from 'components/Header';
import TopBack from 'components/TopBack';
import Footer from 'components/Footer';
import PostCard from 'components/PostCard'
import Colors from '../../colors'
import { loadListUserPost, loadUserInfo, resetParamListPost } from '../App/actions';
import { makeSelectListUserPostData, makeSelectUserInfoData, makeSelectLoading } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { BASE_PREFIX } from 'containers/App/constants';
import Loader from 'components/Loader'
import styled from 'styled-components';

class UserProfile extends Component {

    data = ''
    size = 10
    page = 0

    constructor(props) {
        super(props)
        this.state = {
            listPost: null,
            userInfoData: null,
            totalPages: 0,
            userId: props.params.userId,
            loading: true,
        }
    }
    componentWillReceiveProps(newProps) {
        // console.log("newprops: ", newProps);
        var total = 0
        if (newProps.listUserPostData) {
            this.data = (this.page === 0) ? newProps.listUserPostData.content : this.data.concat(newProps.listUserPostData.content)
            total = newProps.listUserPostData.totalPages
        }
        this.setState({ listPost: this.data, totalPages: total, userInfoData: newProps.userInfoData, loading: newProps.loading })
    }
    componentDidMount() {
        this.props.onLoadUserInfo(this.state.userId)
        this.props.onLoadListUserPost(this.state.userId, this.page, this.size)
    }

    handleClickViewMore = () => {
        this.page += 1
        this.props.onLoadListUserPost(this.state.userId, this.page, this.size)
    }

    handleClickBackButton = () => {
        this.props.router.goBack()
    }

    handleClickProfile = () => {
        this.props.router.push({pathname:BASE_PREFIX+'/sp/reviews/' + this.state.userId})
    }

    handleClickLogo = () => {
        this.props.router.push(BASE_PREFIX+'/sp')
        this.props.handleResetParamListPost()
    }

    handleClickSearchPost =() =>{
        this.props.router.push(BASE_PREFIX+'/sp/search-post');
    };

    render() {
        const { userInfoData } = this.state
        if (!userInfoData)
            return null

        const listPostLi = (this.state.listPost) ? this.state.listPost.map((item, i) =>
            <Li key={item.postId} onClick={() => {  this.props.router.push(BASE_PREFIX+'/sp/post-detail/' + item.postId)}}>
                <PostCard postData={item} />
            </Li>
        ) : null;

        const viewMoreButton = (this.page < this.state.totalPages - 1) ? <ViewMoreDiv>
            <button className='button-view-more' onClick={this.handleClickViewMore}>もっと見る</button>
        </ViewMoreDiv> : null

        return (
            <Div>
                <Loader loading={this.state.loading} />
                <Header handleClickLogo={this.handleClickLogo} handleClickSearchPost={() => { this.handleClickSearchPost() }} />
                    <DivInfo>
                        <UserInfo data={userInfoData} fromScreen='userProfile' onClickUserInfo={this.handleClickProfile} />
                        <div style={{ marginTop: 10 }}>
                            {listPostLi}
                        </div>
                    </DivInfo>
                    {viewMoreButton}
                    <Footer />
            </Div>
        )
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        onLoadListUserPost: (userId, page, size) => { dispatch(loadListUserPost(userId, page, size)); },
        onLoadUserInfo: (userId) => { dispatch(loadUserInfo(userId)); },
        handleResetParamListPost: () =>{ dispatch(resetParamListPost())}
    };
}
const mapStateToProps = createStructuredSelector({
    userInfoData: makeSelectUserInfoData(),
    listUserPostData: makeSelectListUserPostData(),
    loading: makeSelectLoading()
})
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

const Div = styled.div`
    width:100%;
    background:#2f2f2;
`;

const DivInfo = styled.div`
    padding:10px 10px 0px 10px;
    width:100%;
    background:#f2f2f2;
`;

const Li = styled.li`
    width: 100%;
    display: inline-block;
    padding-bottom:7px;
`;

const ViewMoreDiv = styled.div`
    width: 100%;
    text-align:center;
    padding-top: 25px;
    background: #f2f2f2;
`;

const ImgBanner = styled.img`
    margin-top:10px;
    width: 100%;
`;

