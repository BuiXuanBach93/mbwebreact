import Slider from 'react-slick'
import Div from './Div';
import Dot from './Dot';
import React, { Component } from 'react';
import styled from 'styled-components';
import request from 'utils/request';
import {BANNER_TYPE, API_GET_BANNER_DATA, MAINTAIN_URL} from '../../containers/App/constants'

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

class BannerSlider extends Component {

    position = 0

    constructor(props) {
        super(props)
        this.state = { interval: null, position: 0, bannerData: props.bannerData }
    }

    // componentWillReceiveProps(newProps) {
    //     if (newProps.bannerData) {
    //         this.setState({ bannerData: newProps.bannerData })
    //     }
    // }

    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                var position = this.state.position === this.state.bannerData.length - 1 ? 0 : this.state.position + 1
                this.refs.slider.slickGoTo(position)
                this.setState({ position: position})
            }, 5000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    handleSwipe = (index, newIndex) => {
        this.setState({ position: newIndex})    }

    handlePress = (rowData) => {
        // console.log('onClickBannerSlider', rowData)
        var data = {}
        var isOpenPostDetail = false
        var isShowAlert = false
        var ctx = this;
        fetch(API_GET_BANNER_DATA)
        .then(function(response) {
            if (response.status === 503) {
                window.open(MAINTAIN_URL,"_self");
            }
            // console.log(response);
            return response.json();
        })
        .then(function(json) {
            ctx.setState({ bannerData: json })
            if (ctx.hasExpired(rowData.bannerId, json)) {
                isShowAlert = true
                ctx.props.handleBannerClick(isShowAlert, isOpenPostDetail, data)
            }
            else {
                switch (rowData.destinationType) {
                    case BANNER_TYPE.WEB:
                        window.location.assign(rowData.webUrl)
                        break
                    case BANNER_TYPE.CATEGORY:
                    case BANNER_TYPE.KEYWORD:
                        data.bannerId = rowData.bannerId
                        ctx.props.handleBannerClick(isShowAlert, isOpenPostDetail, data)
                        break
                    case BANNER_TYPE.POST_ID:
                        let postIds = (rowData.postIds) ? rowData.postIds.split(',') : []
                        console.log('postIds', postIds)
                        if (Object.prototype.toString.call(postIds) === '[object Array]' && postIds.length === 1) {
                            data.postId = postIds[0]
                            isOpenPostDetail = true
                            ctx.props.handleBannerClick(isShowAlert, isOpenPostDetail, data)
                        }
                        else {
                            data.bannerId = rowData.bannerId
                            ctx.props.handleBannerClick(isShowAlert, isOpenPostDetail, data)
                        }
                        break
                    default:
                        break
                }
            }
        });

        // request(API_GET_BANNER_DATA, null).then((json) => {
        //     // console.log('BannerData', json)
        //     this.setState({ bannerData: json })
        //     if (this.hasExpired(rowData.bannerId, json)) {
        //         isShowAlert = true
        //         this.props.handleBannerClick(isShowAlert, isOpenPostDetail, data)
        //     }
        //     else {
        //         switch (rowData.destinationType) {
        //             case BANNER_TYPE.WEB:
        //                 window.location.assign(rowData.webUrl)
        //                 break
        //             case BANNER_TYPE.CATEGORY:
        //             case BANNER_TYPE.KEYWORD:
        //                 data.bannerId = rowData.bannerId
        //                 this.props.handleBannerClick(isShowAlert, isOpenPostDetail, data)
        //                 break
        //             case BANNER_TYPE.POST_ID:
        //                 let postIds = (rowData.postIds) ? rowData.postIds.split(',') : []
        //                 console.log('postIds', postIds)
        //                 if (Object.prototype.toString.call(postIds) === '[object Array]' && postIds.length === 1) {
        //                     data.postId = postIds[0]
        //                     isOpenPostDetail = true
        //                     this.props.handleBannerClick(isShowAlert, isOpenPostDetail, data)
        //                 }
        //                 else {
        //                     data.bannerId = rowData.bannerId
        //                     this.props.handleBannerClick(isShowAlert, isOpenPostDetail, data)
        //                 }
        //                 break
        //             default:
        //                 break
        //         }
        //     }
        // })
    }

    hasExpired(bannerId, newData) {
        var hasExpired = true
        if (!newData)
            return false
        for (var i = 0; i < newData.length; i++)
            if (bannerId === newData[i].bannerId)
                hasExpired = false
        return hasExpired
    }

    render() {

        var heightImage = (innerWidth - 20) / 7.15 + 'px'
        const bannerImage = {
            width: '100%',
            height: heightImage,
            position: 'relative'
        }

        this.Images = this.state.bannerData.map((rowData, i) => {
            return <Div key={i} img={rowData.imageUrl} height={heightImage} onClick={() => this.handlePress(rowData)} />
        })

        if (this.state.bannerData.length === 1)
            this.Dots = null;
        else
            this.Dots = this.state.bannerData.map((dot, i) => <Dot key={i} indexDot={i} active={this.state.position} />)

        var settings = {
            dots: false,
            beforeChange: this.handleSwipe,
            arrows: false,
            infinite: false
        };

        return (
            <div style={bannerImage}>
                <Slider ref='slider' {...settings} initialSlide={0}>
                    {this.Images}
                </Slider>
                <ListDot>
                    {this.Dots}
                </ListDot>
            </div>
        )
    }
}

export default BannerSlider;

const ListDot = styled.div`
position:absolute;
width: 100%;
justify-content: center;
display:flex;
bottom: 3px;
`;