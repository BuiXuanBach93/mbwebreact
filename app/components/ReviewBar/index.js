import React,{Component} from 'react';
import styled from 'styled-components';
import IconReview from './IconReview';
import Create from './tabbar_create.png';
import Bad from './ic_review_bad_off.png';
import Good from './ic_review_good_off.png';
import Normal from './ic_review_normal_off.png'
const DIV = styled.div`
    width:100%;
    display:flex;
    margin:0 auto;
    margin-top:10px;
    align-items:center;
    justify-content:space-between;
`;
class ReviewBar extends Component{

    constructor(props){
        // console.log('Test', props)
        super(props)
    }
    render(){
        var postNumber = ''
        var goodTypeNumber = ''
        var fairTypeNumber = ''
        var badTypeNumber = ''
        if(this.props.data && this.props.fromScreen === 'userProfile'){
            goodTypeNumber = this.props.data.goodReviewNumber
            fairTypeNumber = this.props.data.normalReviewNumber
            badTypeNumber = this.props.data.badReviewNumber
            postNumber = this.props.data.postNumber
        }
        else if (this.props.data ) {
            if (this.props.data.userReviewCount) {
                goodTypeNumber = this.props.data.userReviewCount.goodTypeNumber
                fairTypeNumber = this.props.data.userReviewCount.fairTypeNumber
                badTypeNumber = this.props.data.userReviewCount.badTypeNumber
            }
            if (this.props.data.shmUser)
                postNumber = this.props.data.shmUser.postNumber
        }
        
        return(
            <DIV>
                <IconReview img={Create}  numberReview={postNumber} />
                <IconReview img={Good}  numberReview={goodTypeNumber} />
                <IconReview img={Normal}  numberReview={fairTypeNumber} />
                <IconReview img={Bad}  numberReview={badTypeNumber} />
            </DIV>
        );
    }
}
export default ReviewBar;