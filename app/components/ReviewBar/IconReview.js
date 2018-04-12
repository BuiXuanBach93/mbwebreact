import styled from 'styled-components';
import React,{Component} from'react';
import NormalImg from 'components/Img';
const DIV = styled.div`
    margin:0 auto;
    display: flex;
    align-items:center;
`;
const IMG = styled(NormalImg)`
  width: 20px;
  height:20px;
  display: block;
  float:left;
  margin-left:2%;
`;
const P = styled.p`
   margin-left:5px;
   font-size: 13px;
`;
class IconReview extends Component {
    render(){
        return(
            <DIV>
                <IMG src={this.props.img} alt=""/>
                <P>{this.props.numberReview}</P>
            </DIV>
        );
    }
}
export default IconReview;