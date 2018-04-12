import styled from 'styled-components';
const Div = styled.div `
  position:absolute;
  width: 60px;
  height:80px;
  display: ${prop=>prop.active===0? 'none':'block' };
  float:left;
  left:0;
  top:220px;
  padding: 20px;
`;
export default Div;
