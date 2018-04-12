import React, { Component } from 'react';
import P from './P';
import Avatar from './Avatar'
import ReviewBar from 'components/ReviewBar';
import Colors from '../../colors'
import Utils from '../../utils/Utils'
import styled from 'styled-components';

const Div = styled.div`
    width:100%;
    background:#ffffff;
    padding: 10px 10px 10px 10px;
`;

export default class UserInfo extends Component {

    constructor(props) {
        // console.log('props', props)
        super(props)
    }
    render() {
        var shmUser = null
        var avatar = null
        var description = null
        var description = null
        var address = null
        var age = null
        var gender = null
        var nickName = null
        var career = null
        var job = null
        var userId = null;

        if (this.props.fromScreen === 'userProfile') {
            avatar = this.props.data.avatar
            description = this.props.data.userDescr
            address = (this.props.data.province && this.props.data.district) ? this.props.data.province.areaName + this.props.data.district.areaName : ''
            age = (this.props.data.userDateOfBirth) ? (Utils.getAge(this.props.data.userDateOfBirth)+'歳') : ''
            gender = (this.props.data.userGender) ? Utils.getGender(this.props.data.userGender) : ''
            nickName = this.props.data.userNickName
            career = this.props.data.career
            job = this.props.data.userJob
            userId = this.props.data.userId
        }
        else {
            shmUser = (this.props.data) ? this.props.data.shmUser : null
            avatar = (shmUser) ? shmUser.avatar : ''
            description = (shmUser && this.props.fromScreen === 'userProfile') ? shmUser.description : ''
            address = (shmUser && shmUser.province && shmUser.address) ? shmUser.province.areaName + shmUser.address.areaName : ''
            age = (shmUser && shmUser.dateOfBirth) ? (Utils.getAge(shmUser.dateOfBirth) + '歳') : ''
            gender = (shmUser && shmUser.gender) ? Utils.getGender(shmUser.gender) : ''
            nickName = (shmUser) ? shmUser.nickName : ''
            career = (shmUser) ? (shmUser.career) : ''
            job = (shmUser) ? (shmUser.job) : ''
            userId = (shmUser) ? shmUser.id : 1
        }

        return (
            <Div onClick={() => { this.props.onClickUserInfo() }}>
                <div>
                    <Avatar img={avatar} background_color={Colors.grayBackground} />
                    <P float="left" margin_top="-40px" margin_left="65px" size="20px" >{nickName}</P>
                </div>
                <P size="14px" margin_top="10px">{description}</P>
                <P font_weight="bold" margin_top="10px" size="14px" >年齢：{age}　性別：{gender}　住所：{address}
                    <br />職業：{career}
                    <br />職種：{job}
                </P>
                <ReviewBar data={this.props.data} fromScreen={this.props.fromScreen}/>
            </Div>
        )
    }
}