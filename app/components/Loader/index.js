import React, { Component } from 'react';
import styled from 'styled-components';

class Loader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.loading)
            return (
                <Wrapper>
                    <div className='loader'></div>
                </Wrapper>
            )
        else return <div></div>

    }
}
export default Loader;

const Wrapper = styled.div`
position: fixed;
width:100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
top: 0;
right: 0;
bottom: 0;
left: 0;
background: rgba(0, 0, 0, 0.4);
z-index: 9999;
`;
