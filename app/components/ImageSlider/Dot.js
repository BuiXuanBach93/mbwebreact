import styled from 'styled-components';
const Div = styled.div`
  width:8px;
  height:8px
  border-radius:50%;
  margin:4px;
  background:#FFFFFF;
  opacity:${prop => prop.active===prop.indexDot ? '1' : '0.5'};
`;
export default Div;