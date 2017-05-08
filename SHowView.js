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
          <TextInput  style={[tempStyle.textinputtype,{backgroundColor:'red'}]}
                      placeholder={this.props.nodeM.placeholder}
                      autoCapitalize="none"
                      autoCorrect={false}
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
