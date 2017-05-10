import React, { Component } from 'react';

import {
    StyleSheet
} from 'react-native';

import Dimen from './../utils/dimission';

export let ShowViewStyleDefault = StyleSheet.create({
  ViewType: {
    flex: 1,
    marginTop: 5
  },
  TitleTextType: {
    color: '#999999',
    fontSize: 14,
    marginLeft: 11
  },
  textinputtype: {
    height: 30,
    width: Dimen.window.width-50,
    borderColor: 'blue',
    borderRadius: 10,
    marginLeft: 11,
    fontSize: 16,
    marginTop: 10
  },
  LineType: {
    marginLeft: 5,
    marginRight: 5,
    height: 1,
    backgroundColor: '#eeeeee',
    marginTop:10,
  }
});

export let  ShowViewStyleBig = StyleSheet.create({
  ViewType: {
    height:80,
    marginTop:15
  },
  TitleTextType:{
      color:'#d2691e',
      fontSize:30,
      marginLeft:30
    },
    textinputtype:{
      height:30,
      width:250,
      borderColor:'blue',
      borderRadius:10,
      marginLeft:30,
      fontSize:12,
      marginTop:15
    },
});

export let  ShowViewStyleSmall = StyleSheet.create({
  ViewType: {
    flex:1,
    marginTop:15
  },
  TitleTextType:{
      color:'#d2691e',
      fontSize:18,
      marginLeft:30
    },
    textinputtype:{
      height:30,
      width:250,
      borderColor:'blue',
      borderRadius:10,
      marginLeft:30,
      fontSize:12,
      marginTop:15
    },
});
