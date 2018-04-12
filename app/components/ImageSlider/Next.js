import styled  from 'styled-components';
const Div = styled.div`
position:absolute;
  width: 60px;
  height:80px;
  display: ${prop=> prop.active===prop.max ? 'none':'block'};
  float:right;
  top:220px;
  right:0;
  padding: 20px;
`;
export default Div;
