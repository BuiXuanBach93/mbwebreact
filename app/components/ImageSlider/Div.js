import styled from 'styled-components';
const Div = styled.div`
  width:100%;
  height:360px;
  padding:10px;
  background-position: center center;
  background-size: cover;
  background-image: url('${state => state.img}');
`;
export  default Div ;
