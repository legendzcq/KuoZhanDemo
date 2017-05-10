import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';
import { ShowViewStyleSmall, ShowViewStyleDefault, ShowViewStyleBig } from './ShowViewStyleDefault'
import { GetImageDictValue } from './../utils/ImageDict'
var    AllNum = 0;
var    CurrNum = 0;
export default class TitleinputView extends Component {
   constructor(props)
   {
     super(props);

     this.state={
      ResValue:'',
      ResValueNum: this.props.nodeM.maxLength ? `0/${this.props.nodeM.maxLength}`:'',
      GetResValueCallBackFunc:null,
     }
   }
    render() {
        
         let tempStyle = this.props.ShowStyle;
         AllNum = this.props.nodeM.maxLength;
        return (
        <View style={tempStyle.ViewType}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}> 
             <Image style={styles.IconType} source={GetImageDictValue(this.props.nodeM.source)}/>       
          <TextInput  {...this.props} 
                    style={tempStyle.Titletextinputtype}
                      placeholder={this.props.nodeM.placeholder}
                      autoCapitalize="none"
                      placeholderTextColor={'#cccccc'}  
                      autoCorrect={false}
                      onChangeText={(text)=>{
                          var len =CurrNum = text.replace(/[^\x00-\xff]/g, "**").length; //正则判断输入字符串的长度
                        this.props.nodeM.maxLength ?   this.setState({ResValueNum:`${len}/${this.props.nodeM.maxLength}`,ResValue:text}):this.setState({ResValue:text});
                          this.GetResValueCallBackFunc(text, this.props.nodeM.classID);
                      } }
                     
                      ref={this.props.nodeM.classID}
                      />
          {this.props.nodeM.maxLength >CurrNum? <Text style={styles.NumTypeL} >{this.state.ResValueNum}</Text> :<Text style={styles.NumTypeR} >{this.state.ResValueNum}</Text>} 
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
var styles = StyleSheet.create({
  NumTypeL: {
    fontSize:12,
    color:'#999999',
    textAlign:'right'
    },
    NumTypeR: {
    fontSize:12,
    color:'red',
    textAlign:'right'
  },  
  IconType: {
      width: 40,  
      height: 31,
      marginLeft:11,
    
  }  
});