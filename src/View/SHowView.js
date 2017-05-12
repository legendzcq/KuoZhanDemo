import React, { Component } from 'react';

import {
    View,
    StyleSheet
} from 'react-native';

import NomalinputView from './NomalinputView' //普通输入框
import TitleinputView from './TitleinputView' //标题
import ClassNameView from './ClassNameView'  //分类

import {ShowViewStyleSmall,ShowViewStyleDefault,ShowViewStyleBig} from './ShowViewStyleDefault'
export default class SHowView extends Component {
   constructor(props)
   {
     super(props);

     this.state={
      ResValue:'',
      GetResValueCallBackFunc:null,
     }
   }
    render() {
        
         let tempStyle;
         let stylevalue ='default';
         if(stylevalue == 'small')         tempStyle = ShowViewStyleSmall;
         else if(stylevalue == 'default')  tempStyle = ShowViewStyleDefault;
         else                              tempStyle = ShowViewStyleBig;
         if (this.props.nodeM.classID == 'title') {
        return (
            <View style={[styles.MainViewType]}>
                <TitleinputView ShowStyle={tempStyle} {...this.props} />
          </View>
        );
         }
         else if (this.props.nodeM.classID == 'ClassName')
         { 
        return (
            <View style={[styles.MainViewType]}>
                <ClassNameView ShowStyle={tempStyle} {...this.props} />
          </View>
        );
         }     
         else
         { 
        return (
            <View style={styles.MainViewType}>
                <NomalinputView ShowStyle={tempStyle} {...this.props} />
          </View>
        );
         }    

    }
   
}

const styles = StyleSheet.create({
  MainViewType: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      height: 80,
  }
});