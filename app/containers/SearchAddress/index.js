import React, { Component } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import AddressParentSearch from 'components/AddressParentSearch';
import { connect } from 'react-redux';
import { loadListAddress, handleClickAdresssSearch, handleClickSubAdresssSearch, resetParamListPost, resetOptionSearch } from '../App/actions';
import { makeSelectListAddress } from 'containers/App/selectors';
import { BASE_PREFIX } from 'containers/App/constants';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import IcBack from 'img/btn_nav_back.png';
import IcArrowRight from 'img/ic_arrow_right.png';

const TAG = 'SearchAddress'

class SearchAddress extends Component {
    constructor(props){
        super(props)
    }

    handleClickIconSearchPost =() =>{
        this.props.handleClickReset()
        this.props.router.push(BASE_PREFIX+'/sp/search-post');
    };

    handleClickLogo = () => {
        this.props.router.push(BASE_PREFIX+'/sp')
        this.props.handleResetParamListPost()
    }

    handleClickParentAddress = (id, name) =>{
       if(id == 0){
          this.props.handleSelectAddress({parentAddressId: id, parentAddress: name})
          this.props.handleSelectSubAddress({childAddressId: 0 , childAddress: 'すべて'})
          this.props.router.goBack();
          return;
       } 
      this.props.handleSelectAddress({parentAddressId: id, parentAddress: name})
      this.props.router.push({pathname: BASE_PREFIX+'/sp/search-subaddress/' + id});
    }

    componentWillMount() {
        this.props.loadListAddress();
    }

    render() {
         const {listAddresstData} = this.props;
        //  console.log("prop: ",this.props);
         if(!listAddresstData){
             return null;
         }
        return (
            <div>
                <Header  handleClickSearchPost={()=>{this.handleClickIconSearchPost()}} handleClickLogo={this.handleClickLogo}/>
                <OptionSearchDiv>
                    <AddressParentSearch addresses = {listAddresstData} handleClickParentAddress={(id,name)=>{this.handleClickParentAddress(id,name)}}/>
                </OptionSearchDiv>    
                <Footer />
            </div>
        );
    }
}
export function mapDispatchToProps(dispatch) {
    return {
        handleClickReset: (evt) => { dispatch(resetOptionSearch()) },
        loadListAddress: (evt) => { dispatch(loadListAddress());},
        handleSelectAddress : (addressData) =>{ dispatch(handleClickAdresssSearch(addressData))},
        handleSelectSubAddress: (addressData) =>{dispatch(handleClickSubAdresssSearch(addressData))},
        handleResetParamListPost: () =>{ dispatch(resetParamListPost())}
    };
}
const mapStateToProps = createStructuredSelector({
    listAddresstData: makeSelectListAddress(),
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchAddress);

const OptionSearchDiv = styled.div`
margin-top:0px;
padding:10px;
background:#f2f2f2;
`;

const Label = styled.label`
margin-top:10px;
margin-bottom:5px;
font-size:12px;
`;

const ChosenLabel = styled.label`
font-size:12px;
font-weight:bold;
`;

const ChooseDiv = styled.div`
width: 100%
height:45px;    
margin: 5px 0;
padding-top: 8px;
padding-left: 15px;
display: inline-flex;
border: 1px solid;
box-sizing: border-box;
background:white;
`;

const ChosenLabelDiv = styled.div`
width : 90%;
`;

const ArrowRightDiv = styled.div`
width : 10%;
`;

const ImgArrowRight = styled.img`
height: 15px;
`;
