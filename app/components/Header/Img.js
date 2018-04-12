import styled from 'styled-components';
import NormalImg from 'components/Img';

const Img = styled(NormalImg)`
  width: 240px;
  margin-left:5%;
  display: block;
  object-fit: contain'
`;
const ImgSearch = styled(NormalImg) `
     width: 25px;
     height:25px;
`;
export {Img,ImgSearch} ;
