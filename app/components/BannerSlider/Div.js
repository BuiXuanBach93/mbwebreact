import styled from 'styled-components';

const windowHeight = window.innerHeight;
const windowWith = window.innerWidth;

const Div = styled.div`
  width:100%;
  height:${state => state.height};
  background-position: center center;
  background-size: cover;
  background-image: url('${state => state.img}');
`;
export  default Div ;
