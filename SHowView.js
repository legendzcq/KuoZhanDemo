import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
} from 'react-native';
import {ShowViewStyleSmall,ShowViewStyleDefault,ShowViewStyleBig} from './ShowViewStyleDefault'

export default class SHowView extends Component {
   constructor(props)
   {
     super(props);
     this.state={
      ResValue:''
     }
   }
    render() {
        
         let tempStyle;
         let stylevalue ='default';
         if(stylevalue == 'small')
         {
             tempStyle = ShowViewStyleSmall;
         }else if(stylevalue == 'default')
         {
             tempStyle = ShowViewStyleDefault;
         }
         else
         {
             tempStyle = ShowViewStyleBig;
         }

http://blog.csdn.net/u013224660/article/details/51163067     propTypes = {   http://www.jianshu.com/p/d4b7f8f322b6
    http://guotaiyaxing.cn.segmentfault.com/q/1010000009182684


        return (
        <View style={tempStyle.ViewType}>
          <Text style={tempStyle.TitleTextType}>{this.props.nodeM.title}</Text>
          <View style={{flexDirection:'row'}}> 
          <TextInput  {...this.props} 
                      style={[tempStyle.textinputtype,{backgroundColor:'red'}]}
                      placeholder={this.props.nodeM.placeholder}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={(text) => {this.setState({ResValue:text});}}
                      value={this.state.ResValue}
                      ref={this.props.nodeM.class}
                      />
           <Text >0/14 </Text>
         </View>
          <View style={{marginTop:4, marginLeft:5,marginRight:5,
                        height:1,backgroundColor:'#eeeeee'}}>
          </View>
          </View>
        );
    }
   
}
