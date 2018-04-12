import React, { Component } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import AddressChildSearch from 'components/AddressChildSearch';
import { connect } from 'react-redux';
import { loadListSubAddress, handleClickSubAdresssSearch, resetParamListPost, resetOptionSearch } from '../App/actions';
import { makeSelectListSubAddress} from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import IcArrowRight from 'img/ic_arrow_right.png';
import { BASE_PREFIX } from 'containers/App/constants';

const TAG = 'SearchSubAddress'

class SearchSubAddress extends Component {
    constructor(props){
        super(props);
        // console.log(TAG + '>Constructor>Props', props);
        this.parentId = props.routeParams.parentId;
    }

    handleClickIconSearchPost =() =>{
        this.props.handleClickReset()
        this.props.router.push(BASE_PREFIX+'/sp/search-post');
    };

    handleClickLogo = () => {
        this.props.router.push(BASE_PREFIX+'/sp')
        this.props.handleResetParamListPost()
    }

    handleClickChildAddress = (id, name) =>{
        this.props.handleSelectSubAddress({childAddressId: id, childAddress: name})
        this.props.router.push(BASE_PREFIX+'/sp/search-post');
    }

    componentWillMount() {
        this.props.loadListSubAddress(this.parentId);
    }

    render() {
         const {listSubAddresstData} = this.props;
         if(!listSubAddresstData){
             return null;
         }
        return (
            <div>
                <Header  handleClickSearchPost={()=>{this.handleClickIconSearchPost()}} handleClickLogo={this.handleClickLogo}/>
                <OptionSearchDiv>
                    <AddressChildSearch addresses = {listSubAddresstData} handleClickChildAddress={(id,name)=>{this.handleClickChildAddress(id,name)}}/>
                </OptionSearchDiv>    
                <Footer />
            </div>
        );
    }
}
export function mapDispatchToProps(dispatch) {
    return {
        handleClickReset: (evt) => { dispatch(resetOptionSearch()) },
        loadListSubAddress: (parentId) => {dispatch(loadListSubAddress(parentId)); },
        handleSelectSubAddress: (addressData) =>{dispatch(handleClickSubAdresssSearch(addressData))},
        handleResetParamListPost: () =>{ dispatch(resetParamListPost())}    };
}
const mapStateToProps = createStructuredSelector({
    listSubAddresstData: makeSelectListSubAddress(),
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchSubAddress);

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

