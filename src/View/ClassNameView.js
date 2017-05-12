import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,

} from 'react-native';
import { ShowViewStyleSmall, ShowViewStyleDefault, ShowViewStyleBig } from './ShowViewStyleDefault';
import { getString } from './../Language/RString.js';

export default class ClassNameView extends Component {
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
        return (
        <View style={tempStyle.ViewType}>
          <Text style={tempStyle.TitleTextType}>{getString(this.props.nodeM.title)}</Text>
          <Text style={styles.containType}>{getString(this.props.nodeM.placeholder)}</Text>
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
    containType: {
      marginTop:10,
      fontSize: 16,
      color: '#333333',
      marginLeft: 11
          
    },
 
});