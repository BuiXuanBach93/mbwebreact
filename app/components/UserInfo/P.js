import styled from 'styled-components';
const P = styled.p`
    margin:auto;
    margin-bottom:3px;
    margin-top:3px;
    font-size:${prop => prop.size};
    padding:${prop => prop.padding};
    margin-top:${prop => prop.margin_top};
    color:${prop => prop.text_color};
    float:${prop => prop.float};
    margin-left:${prop=>prop.margin_left};
    justify-content:${prop=>prop.justfy_content};
    position:${prop => prop.position};
    right:${prop => prop.right};
    clear:${prop => prop.clear};
    font-weight:${prop => prop.font_weight};
    word-wrap:${prop => prop.word_wrap};

`;
export default P;