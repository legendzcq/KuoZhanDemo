import React, { Component } from 'react';

import {
    View,
    StyleSheet
} from 'react-native';

import NomalinputView from './NomalinputView'

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
         if (this.props.nodeM.title == '标题') {
        return (
            <View style={[styles.MainViewType]}>
                <NomalinputView ShowStyle={tempStyle} {...this.props} />
          </View>
        );
         } else
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