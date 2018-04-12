import React, { Component } from 'react';
import Div from './Div';
import Next from './Next';
import Prev from './Prev';
import Dot from './Dot';
import IconNext from '../../img/iconNext.png';
import IconPrev from '../../img/iconPrev.png';
import styled from 'styled-components';
import NoImage from '../../img/img-no-image.png';
import NormalImg from 'components/Img';
import Slider from 'react-slick'
const ListDot = styled.div`
    position:absolute;
    width: 100%;
    justify-content: center;
    display:flex;
    top:400px;
`;
const AppWrapper = styled.div`
  width:100%;
  margin: 1px ;
  height:360px;
`;

const Img = styled(NormalImg) `
width: 20px;
height:30px;
object-fit: contain;
z-index: -1;
`;

class ImageSlider extends Component {

    xDown = null;
    yDown = null;
    index = 0;

    constructor(props) {
        super(props);
        this.image = (this.props.images && this.props.images.length > 0) ? this.props.images : [NoImage];
        this.state = {
            index: 0,
            img: this.image[0]
        };
        this.handleSwipe = this.handleSwipe.bind(this)
    }

    handleClickNext(evt) {
        evt.stopPropagation();
        if (this.state.index < this.props.images.length) {
            this.index = this.state.index + 1
            console.log('Count', this.index)
            this.refs.slider.slickNext()
            this.setState({
                index: this.index,
            });
        }

    }
    handleClickPrev(evt) {
        evt.stopPropagation();
        if (this.index > 0) {
            this.index = this.state.index - 1
            this.refs.slider.slickPrev()
            this.setState({
                index: this.index,

            });
        }
    }

    handleOpenImageViewer = () => {
        this.props.openImageViewer(this.state.index)
    }

    handleSwipe = (index, newIndex) => {
        console.log("index swipe", index, newIndex)
        this.setState({ index: newIndex })
    }


    render() {
        if (this.props.images.length === 1)
            this.Dots = null;
        else
            this.Dots = this.props.images.map((dot, i) => <Dot key={i} indexDot={i} active={this.state.index} />)

        if (this.props.images.length === 0) {
            return <AppWrapper>
                <Div img={this.state.img}>
                </Div>
            </AppWrapper>
        }
        else if (this.props.images.length === 1) {
            return <AppWrapper onClick={this.handleOpenImageViewer}>
                <Div img={this.state.img}>
                </Div>
            </AppWrapper>
        }
        else this.Images = this.props.images.map((image, i) => <Div key={i} img={image} />)
        var settings = {
            dots: false,
            arrows: false,
            beforeChange: this.handleSwipe,
            infinite: false
        };
        return (
            <AppWrapper onClick={this.handleOpenImageViewer}>
                <Slider ref='slider' {...settings} initialSlide={this.state.cout}>
                    {this.Images}
                </Slider>
                <Next onClick={this.handleClickNext.bind(this)} active={this.state.index} max={this.props.images.length - 1} >
                    <Img src={IconNext} alt="react-boilerplate" />
                </Next>
                <Prev onClick={this.handleClickPrev.bind(this)} src={IconPrev} alt="react-boilerplate" active={this.state.index}>
                    <Img src={IconPrev} alt="react-boilerplate" />
                </Prev>
                <ListDot>
                    {this.Dots}
                </ListDot>
                
            </AppWrapper>
        );
    }
}
export default ImageSlider;