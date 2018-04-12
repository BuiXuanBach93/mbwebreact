import React, { Component, PropTypes, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import Constants from '../../constants'
import NormalImg from 'components/Img';
import styled from 'styled-components'

const TAG = 'DropDown'

export default class DropDown extends React.Component {

    constructor(props) {
        super(props);
        // console.log(TAG + '>Constructor>Props', props);
        this.state = {
            value: props.value,
            open: false
        }

        this.handleHide = this.handleHide.bind(this);
    }
    componentWillMount() {
        window.addEventListener('click', this.handleHide, false);
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.handleHide, false);
    }

    componentWillReceiveProps(nextProps){
        // console.log(TAG + '>componentWillReceiveProps>NextProps', nextProps);
        this.setState({value: nextProps.value})
    }

    handleSelectSortType(i, item) {
        // console.log('SortType', item, i)
        this.props.onClickSelectSortType(Constants.sortKeys[i], i)
    }

    render() {
        var pageWidth = window.innerWidth;
        var width = pageWidth / 2 - 20;

        const listItem = this.props.listItem.map((item, i) => {
            return (<a key={i} onClick={this.handleSelectSortType.bind(this, i, item)}>{item}</a>)
        })

        const dropDownContent = <div id="myDropdown" style={{ width: width }} className="dropdown-content">
            {listItem}
        </div>

        return (
            <div className="dropdown">
                <div style={{ width: width }} onClick={this.handleToggle} className="dropbtn">
                    <div>{this.state.value}</div>
                    <PickerArrow src={require("../../img/picker_arrow.png")} alt=""/>
                </div>
                {(this.state.open) ? dropDownContent : null}
            </div>
        );
    }
    handleToggle = (evt) => {
        console.log('Dropdown click')
        evt.stopPropagation();
        this.setState({open : !this.state.open});
    }
    handleHide = (evt) => {
        if (!evt.target.matches('.dropbtn')) {
            console.log('Dropdown click')
            if(this.state.open) {
                this.setState({open : false});
            }
        }
    }
}

const PickerArrow = styled(NormalImg)`
width: 20px;
height:10px;
`;