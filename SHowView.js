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
const  allNum = 14;
export default class SHowView extends Component {
   constructor(props)
   {
     super(props);
     this.state={
      ResValue:'',
      ResValueNum:`0/${allNum}`
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

        return (
        <View style={tempStyle.ViewType}>
          <Text style={tempStyle.TitleTextType}>{this.props.nodeM.title}</Text>
          <View style={{flexDirection:'row'}}> 
          <TextInput  {...this.props} 
                      style={[tempStyle.textinputtype,{backgroundColor:'red'}]}
                      placeholder={this.props.nodeM.placeholder}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={(text)=>{
              
                      
                       var len=text.replace(/[^\x00-\xff]/g, "**").length; //正则判断输入字符串的长度
                       if(len>14)
                      {
                          return;
                      }
                          this.setState({ResValueNum:`${len}/${allNum}`,ResValue:text});
                          this.GetResValueCallBackFunc(text,this.props.nodeM.class);
                      } }
                     
                      value={this.state.ResValue}
                      ref={this.props.nodeM.class}
                      />
           <Text >{this.state.ResValueNum}</Text>
         </View>
          <View style={{marginTop:4, marginLeft:5,marginRight:5,
                        height:1,backgroundColor:'#eeeeee'}}>
          </View>
          </View>
        );
    }
    //回调函数 1：返回值  2：calssID  3：正则pi
    GetResValueCallBackFunc(text,ClassType)
    {
        if(this.props.GetResValueCallBackFunc == null) return;
        this.props.GetResValueCallBackFunc(text,ClassType);
    }
    // 对输入值进行正则判断
    checkValueFunc(text)
    {
 


         if(this.props.nodeM.restriction.patternM.length < 1)
         {
             return true;
         }
       var patternM:Array<patternModel> = this.props.nodeM.restriction.patternM ? this.props.nodeM.restriction.patternM :[];

      for(let index=0;index < patternM.length ; index++)
      {
         var str = patternM[index].pattern;
         var reg = eval(str);
         if(text.match(reg))
         {
             console.log('匹配');
         }
         else
         {
             console.log( patternM[index].error_message);
         }
      }

      return true;
      
    }
    //初始化属性
    getDefaultProps(){
        return{
            GetResValueCallBackFunc:null,
        }
    }
   
}
