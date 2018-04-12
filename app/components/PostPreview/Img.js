import styled from 'styled-components';

import NormalImg from 'components/Img';

const PostImg = styled(NormalImg)`
  width: 100%;
  height:165px;
  object-fit: cover;
  z-index: -1;
`;
const LikedImg = styled(NormalImg) `
     width: 20px;
     height:20px;
     display: inline-block;
     float:right;
     margin-top: 2px;
     margin-right: 10px;
`;
export {PostImg,LikedImg} ;
