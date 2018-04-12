import React, { Component } from 'react';
import H1 from 'components/H1';
import request from 'utils/request';
import UserInfo from '../../components/UserInfo'
import Header from 'components/Header';
import TopBack from 'components/TopBack';
import Footer from 'components/Footer';
import PostCard from 'components/PostCard'
import Colors from '../../colors'
import { loadListReviews, resetParamListPost } from '../App/actions';
import { makeSelectListReviewsData, makeSelectLoading } from 'containers/App/selectors';
import { BASE_PREFIX } from 'containers/App/constants';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import ReviewBadOff from '../../img/ic_review_bad_off.png'
import ReviewBadOn from '../../img/ic_review_bad_on.png'
import ReviewGoodOff from '../../img/ic_review_good_off.png'
import ReviewGoodOn from '../../img/ic_review_good_on.png'
import ReviewNormalOff from '../../img/ic_review_normal_off.png'
import ReviewNormalOn from '../../img/ic_review_normal_on.png'
import NormalImg from 'components/Img';
import ReviewItem from 'components/ReviewItem';
import styled from 'styled-components';
import Loader from 'components/Loader'

class ListReview extends Component {

    data = ''
    size = 10
    page = 0
    TAG = 'ListReview'

    constructor(props) {
        super(props)
        this.state = {
            listReview: null,
            totalPages: 0,
            tabType: 'ALL',
            totalReviews: 0,
            userId: props.params.userId,
            loading: true
        }
    }

    resetData() {
        this.data = ''
        this.size = 10
        this.page = 0;
    }

    componentWillReceiveProps(newProps) {
        // console.log(this.TAG+'#componentWillReceiveProps', newProps);
        var total = 0
        var totalReviews = 0
        if (newProps.listReviewsData) {
            this.data = (this.page === 0) ? newProps.listReviewsData.content : this.data.concat(newProps.listReviewsData.content)
            total = newProps.listReviewsData.totalPages
            totalReviews = newProps.listReviewsData.totalElements
        }
        this.setState({ listReview: this.data, totalPages: total, totalReviews: totalReviews, userInfoData: newProps.userInfoData, loading: newProps.loading})
    }
    componentDidMount() {
        this.props.onLoadListReviews('ALL', this.state.userId, this.page, this.size)
    }

    handleClickViewMore = () => {
        this.page += 1
        this.props.onLoadListReviews(this.state.tabType, this.state.userId, this.page, this.size)
    }

    handleClickAllTab = () => {
        this.setState({ tabType: 'ALL' })
        this.resetData()
        this.props.onLoadListReviews('ALL', this.state.userId, this.page, this.size)
    }

    handleClickGoodTab = () => {
        this.setState({ tabType: 'GOOD' })
        this.resetData()
        this.props.onLoadListReviews('GOOD', this.state.userId, this.page, this.size)
    }

    handleClickNormalTab = () => {
        this.setState({ tabType: 'FAIR' })
        this.resetData()
        this.props.onLoadListReviews('FAIR', this.state.userId, this.page, this.size)
    }

    handleClickBadTab = () => {
        this.setState({ tabType: 'BAD' })
        this.resetData()
        this.props.onLoadListReviews('BAD', this.state.userId, this.page, this.size)
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

    renderTab = () => {
        var allTabClassName = 'button-inactive'
        var goodTabClassName = 'button-inactive'
        var normalTabClassName = 'button-inactive'
        var badTabClassName = 'button-inactive'
        var imgGoodTab = ReviewGoodOff
        var imgNormalTab = ReviewNormalOff
        var imgBadTab = ReviewBadOff

        switch (this.state.tabType) {
            case 'ALL':
                allTabClassName = 'button-active'
                break
            case 'GOOD':
                goodTabClassName = 'div-active'
                imgGoodTab = ReviewGoodOn
                break
            case 'FAIR':
                normalTabClassName = 'div-active'
                imgNormalTab = ReviewNormalOn
                break
            case 'BAD':
                badTabClassName = 'div-active'
                imgBadTab = ReviewBadOn
                break
        }
        return (
            <TabDiv>
                <AllButton className={allTabClassName} onClick={this.handleClickAllTab}>すべて</AllButton>
                <GoodButton className={goodTabClassName} onClick={this.handleClickGoodTab}>
                    <Img src={imgGoodTab} alt='' />
                    <a style={{ fontSize: 12 }}> 良い </a>
                </GoodButton>
                <NormalButton className={normalTabClassName} onClick={this.handleClickNormalTab}>
                    <Img src={imgNormalTab} alt='' />
                    <a style={{ fontSize: 12, marginLeft: 5 }}>普通</a>
                </NormalButton>
                <BadButton className={badTabClassName} onClick={this.handleClickBadTab}>
                    <Img src={imgBadTab} alt='' />
                    <a style={{ fontSize: 12, marginLeft: 5 }}>悪い </a>
                </BadButton>
            </TabDiv>
        )
    }

    render() {

        // List review
        var listReviewLi = null
        if (this.state.listReview && this.state.listReview.length > 0) {
            listReviewLi = this.state.listReview.map((item, i) =>
                <Li className='postItem' key={i} onClick={() => { this.props.router.push(BASE_PREFIX + '/sp/user-profile/' + item.fromShmUser.id) }}>
                    <ReviewItem reviewData={item} />
                </Li>
            )
        } else if (this.state.listReview) {
            listReviewLi = (<NoDataDiv>
                <TextNoData> 当該する評価情報はございませんでした</TextNoData>
            </NoDataDiv>);
        }
        // Button view more
        const viewMoreButton = (this.page < this.state.totalPages - 1) ? <ViewMoreDiv>
            <button className='button-view-more' onClick={this.handleClickViewMore}>もっと見る</button>
        </ViewMoreDiv> : null

        var totalReviews = '評価数：' + this.state.totalReviews + '件'

        return (
            <Div>
                <Loader loading={this.state.loading} />

                <Header handleClickLogo={this.handleClickLogo} handleClickSearchPost={() => { this.handleClickSearchPost() }} />
                {this.renderTab()}
                <TotalDiv>{totalReviews}</TotalDiv>
                <LineDiv />
                <div style={{ marginTop: 10 }}>
                    {listReviewLi}
                </div>
                {viewMoreButton}
                <Footer />
            </Div>
        )
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        onLoadListReviews: (userReviewRate, userId, page, size) => {dispatch(loadListReviews(userReviewRate, userId, page, size));},
        handleResetParamListPost: () =>{ dispatch(resetParamListPost())},
    };
}
const mapStateToProps = createStructuredSelector({
      listReviewsData: makeSelectListReviewsData(),
      loading: makeSelectLoading()
})
export default connect(mapStateToProps, mapDispatchToProps)(ListReview);

const Div = styled.div`
    width:100%;
    background:#f2f2f2;
`;

const TabDiv = styled.div`
    width:100%;
    padding: 15px 10px 0px 10px;
    background: white;
    display:flex;
    flex-direction: row;
    flex:1;
`;

const LineDiv = styled.div`
    width:100%;
    height: 1px
    background: #a1a1a1
`;

const TotalDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px 10px 5px 10px;
    font-size: 14px;
    color: #606060;
    background:#ffffff;
`;

const NoDataDiv = styled.div`
    background: #f2f2f2;
    height: 65px;
    padding: 10px 10px 10px 10px;
`;

const TextNoData = styled.div`
    fontSize:14;
    background: white
    text-align : center;
    padding: 10px 10px 10px 10px
`;

const AllButton = styled.button`
width: 25%;
    height:38px;
    background-color: white;
    color: #606060;
    border: 1px solid #606060;
    border-bottom-left-radius: 7px;
    border-top-left-radius: 7px;
    border-right-style: none;
    font-size: 12px;
`;

const GoodButton = styled.div`
    width: 25%;
    height:38px;
    background-color: white;
    color: #606060;
    border: 1px solid #606060;
    border-right-style: none;
    padding-top: 4px;
    text-align: center;
`;

const NormalButton = styled.div`
    width: 25%; 
    height:38px;
    background-color: white;
    color: #606060;
    border: 1px solid #606060;
    padding-top: 4px;
    text-align: center;
`;

const BadButton = styled.div`
    width: 25%;
    height:38px;
    background-color: white;
    color: #606060;
    border: 1px solid #606060;
    border-bottom-right-radius: 7px;
    border-top-right-radius: 7px;
    border-left-style: none;
    padding-top: 4px;
    text-align: center;
`;

const Img = styled(NormalImg) `
    width: 20px;
    height:20px;
    object-fit: cover;
    z-index: -1;
`;

const Li = styled.li`
    width: 100%;
    display: inline-block;
    padding-bottom:7px;
`;

const ViewMoreDiv = styled.div`
    width: 100%;
    text-align:center;
    margin-top: 25px;
`;



