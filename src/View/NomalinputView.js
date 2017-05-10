import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Platform,
} from 'react-native';
import {ShowViewStyleSmall,ShowViewStyleDefault,ShowViewStyleBig} from './ShowViewStyleDefault'
const  allNum = 14;
export default class NomalinputView extends Component {
   constructor(props)
   {
     super(props);

     this.state={
      ResValue:'',
      ResValueNum:this.props.nodeM.maxLength? `0/${this.props.nodeM.maxLength}`:'',
      GetResValueCallBackFunc:null,
     }
   }
    render() {
        
         let tempStyle = this.props.ShowStyle;
   
        return (
        <View style={tempStyle.ViewType}>
          <Text style={tempStyle.TitleTextType}>{this.props.nodeM.title}</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}> 
          <TextInput  {...this.props} 
                      style={tempStyle.textinputtype}
                      placeholder={this.props.nodeM.placeholder}
                      autoCapitalize="none"
                      placeholderTextColor={'#cccccc'}  
                      autoCorrect={false}
                      onChangeText={(text)=>{
                       var len=text.replace(/[^\x00-\xff]/g, "**").length; //正则判断输入字符串的长度
                          this.setState({ResValueNum:`${len}/${this.props.nodeM.maxLength}`,ResValue:text});
                          this.GetResValueCallBackFunc(text,this.props.nodeM.classID);
                      } }
                     
                      ref={this.props.nodeM.classID}
                      />
          {this.props.nodeM.maxLength?<Text style={tempStyle.NumType} >{this.state.ResValueNum}</Text> :<Text />} 
                </View>
          <View style={tempStyle.LineType} />
          </View>
        );
    }
    //回调函数 1：返回值  2：calssID  3：正则pi
    GetResValueCallBackFunc(text,ClassType)
    {
        if(this.props.GetResValueCallBackFunc == null) return;
        this.props.GetResValueCallBackFunc(text,ClassType);
    }




   
}
