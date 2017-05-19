import React, { Component } from 'react';

import {
    View,
    Image,
    TouchableOpacity,
} from 'react-native';


export default class BtnView extends Component {
   constructor(props)
   {
     super(props);
     this.state={
      BtnClickBackFunc:null,
     }
   }
    render() {
        
        return (
        <View>
        <TouchableOpacity activeOpacity={0.6} onPress={this.BtnClickBackFunc.bind(this)} style={this.props.Touchstyle} >
       <Image source={this.props.iconName} style={{width:18,height:18}}/>
        </TouchableOpacity>
        </View>
        );
    }
        //回调函数 1：返回值  2：calssID  3：正则pi
    BtnClickBackFunc()
    {
        if(this.props.BtnClickBackFunc == null) return;
        this.props.BtnClickBackFunc();
    }
}