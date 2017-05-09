/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import VV_temjson from './VV_template.json'
import ShowView from'./SHowView'

export type patternModel = {

  pattern:string,
  error_message:string,
};

export type restrictionModel = {

  type:string,
  use:string,
  patternM:Array<patternModel>,
};

export type RecviceNodeModel = {
  title:string,
  Tclass:string,
  class:string,
  input:string,
  placeholder:string,
  restriction:restrictionModel,
}


export type RecviceDataModel = {

  title:string,
  class:string,
  node:Array<RecviceNodeModel>,
};


export default class KuoZhanDemo extends Component {
   constructor(props)
   {
     super(props);
      this.state={
        ALLRecviceData:RecviceDataModel=new Object(),
      }
   }

  componentWillMount()
  {
    
      //  var obj = eval(JSON.parse(VV_temjson));
      // alert(VV_temjson.node)
    // alert(VV_temjson);
   var RecviceData:RecviceDataModel=new Object();
    
   RecviceData.title = VV_temjson.title;
   RecviceData.class = VV_temjson.class;
  //  RecviceData.node = VV_temjson.node;
   var NodeArray=new Array();
   for(let index=0;index < VV_temjson.node.length;index++) //解析node
   {
       var RecviceNode:RecviceNodeModel = new Object();
       RecviceNode.title = VV_temjson.node[index].title;
       RecviceNode.Tclass = VV_temjson.node[index].class;
       RecviceNode.input = VV_temjson.node[index].input;
       RecviceNode.class = VV_temjson.node[index].class;
       RecviceNode.placeholder = VV_temjson.node[index].placeholder;

       //解析restriction
       RecviceNode.restriction = new Object();
       RecviceNode.restriction.type = VV_temjson.node[index].restriction[0].type;
       RecviceNode.restriction.use = VV_temjson.node[index].restriction[1].use;
      
       var patternArray=new Array();
       for(let resindex =2 ;resindex < VV_temjson.node[index].restriction.length ; resindex ++)
       {
         var temppattern:patternModel = new Object();
         temppattern.pattern = VV_temjson.node[index].restriction[resindex].pattern;
         temppattern.error_message = VV_temjson.node[index].restriction[resindex].error_message;
          patternArray.push(temppattern);
           
       }
       RecviceNode.restriction.patternM = patternArray;

       NodeArray.push(RecviceNode);
     
   }
    RecviceData.node=NodeArray ;
   this.setState({ALLRecviceData:RecviceData});
    // alert(RecviceData.node[0].input);




  }

  renderList(){
    return this.state.ALLRecviceData.node.map( (item,index) => this.renderItem(item,index) );
  }
    renderItem(item,index) {

      var RecviceNode:RecviceNodeModel = item;

      
    return (
           <ShowView key={index} nodeM ={RecviceNode} ref={RecviceNode.class} {...this.props}/>
       );
  }

  AddRenderList(){
       var RecviceNode:RecviceNodeModel = new Object();
       RecviceNode.title = "新加元素";
       RecviceNode.Tclass = 'itemTitle';
       RecviceNode.input = 'edit';
       RecviceNode.class = 'itemEdit';
       RecviceNode.placeholder = '请输入新增元素';
     
     var RecviceData:RecviceDataModel = this.state.ALLRecviceData;
     var NodeArray=new Array();
     NodeArray = this.state.ALLRecviceData.node;
     NodeArray.push(RecviceNode);
     RecviceData.node = NodeArray;
     this.setState({ALLRecviceData:RecviceData});

       this.renderList();
  }
  SaveList(){
    // for(let index=0 ; index < this.state.ALLRecviceData.node.length;index++)
    // {
      // alert(this.refs[this.state.ALLRecviceData.node[index].class]);
        //  console.log(this.state.ALLRecviceData.node[index].class);
      //  alert(this.state.ALLRecviceData.node[0].class);
        var input = this.refs[this.state.ALLRecviceData.node[0].class];
         
        var tempinput = input.refs[this.state.ALLRecviceData.node[0].class];
        var inputValueres = tempinput.value;
        alert(inputValueres);
        // var inputRect = input.getBoundingClientRect();

        
    // }
  }

  render(){
    return <View style={{flex:1,marginTop:20}}>
      {this.renderList()}
      <Button
  onPress={() => {this.AddRenderList();}}
  title="添加元素点击"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/> 
      <Button
  onPress={() => {this.SaveList();}}
  title="提交元素"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/> 
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    // textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});




AppRegistry.registerComponent('KuoZhanDemo', () => KuoZhanDemo);
