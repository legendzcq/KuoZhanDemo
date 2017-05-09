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
        SaveValueDict:[],
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
           <ShowView key={index} nodeM ={RecviceNode} ref={RecviceNode.class}
            GetResValueCallBackFunc ={(text,ClassType)=>{this.SaveTmepValue(text,ClassType)}}  {...this.props}/>
       );
  }

//保存临时值
  SaveTmepValue(text,ClassType)
  {
     this.state.SaveValueDict[ClassType]=text;
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
    var obj = this.state.SaveValueDict;
for (var prop in obj) {

  this.checkValueFunc(obj[prop],prop);
}
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


    //字符串匹配正则表达式
    checkValueFunc(text,ClassType)
    {
      //  this.state.ALLRecviceData.node.class == ca
         var ALLnodeArray = this.state.ALLRecviceData.node;
        for(let nodeindex=0;nodeindex < ALLnodeArray.length;nodeindex++)
        {
              if(ALLnodeArray[nodeindex].class == ClassType)
              {



         if(ALLnodeArray[nodeindex].restriction.patternM.length < 1)
         {
             return true;
         }
       var patternM:Array<patternModel> = ALLnodeArray[nodeindex].restriction.patternM ? ALLnodeArray[nodeindex].restriction.patternM :[];

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
             return false;
         }
      }


              }





        }

 



      return true;
      
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
