import styled from 'styled-components';

const DIV = styled.div`
    width:50px;
    height:50px;
    border-radius:50%;
    background-image: url('${state => state.img}');
    background-size: cover;
    background-color:${ prop=> prop.background_color};
`;
export default DIV;