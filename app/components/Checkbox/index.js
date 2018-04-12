import React, { Component, PropTypes } from 'react';

const TAG = 'Checkbox'

class Checkbox extends Component {

  constructor(props){
    super(props)
    this.state = {
      value: props.value
    }
  }

  handleClickCheckBox = () =>{
     this.props.onCheckboxClick(!this.state.value)
    //  this.setState({value : !this.state.value})

  }

  componentWillReceiveProps(nextProps){
    // console.log(TAG + '>componentWillReceiveProps>NextProps', nextProps);
    this.setState({value: nextProps.value})
}
  
  render() {
    const { label } = this.props;
    
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ fontSize: 13, marginTop: 5, marginRight: 5}}>{label}</div>
        <div className="round">
          <input
            type="checkbox"
            id="checkbox"
            checked={this.state.value}
            onClick={this.handleClickCheckBox}
          />
          <label htmlFor="checkbox"></label>
        </div>
      </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  onCheckboxClick: PropTypes.func,
};

export default Checkbox;