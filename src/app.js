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
  ScrollView,
  Button,
} from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import VV_temjson from '../VV_template.json'
import ShowView from'./View/SHowView'
import {patternModel} from './Model/jsonModel'
import {restrictionModel} from './Model/jsonModel'
import {RecviceNodeModel} from './Model/jsonModel'
// import {RecviceDataModel} from './Model/jsonModel'
export default class app extends Component {
   constructor(props)
   {
     super(props);
      this.state={
        ALLRecviceData:RecviceDataModel=new Object(),
        SaveValueDict: [],
        keyboardSpace:0,
      }
      global.LanguageType = "zh";
   }
componentDidMount(){
　 RCTDeviceEventEmitter.addListener('keyboardWillShow', this.updateKeyboardSpace.bind(this));
　　RCTDeviceEventEmitter.addListener('keyboardWillHide', this.resetKeyboardSpace.bind(this));
}
componentWillUnmount() {
　　RCTDeviceEventEmitter.removeAllListeners('keyboardWillShow')
　　RCTDeviceEventEmitter.removeAllListeners('keyboardWillHide')
}  
updateKeyboardSpace(frames){
const keyboardSpace = frames.endCoordinates.height//获取键盘高度
this.setState({
  keyboardSpace: keyboardSpace,
})
}
 resetKeyboardSpace(){
   this.setState({
     keyboardSpace: 0,
   　　});
 }  

  componentWillMount()
  {
    

   var RecviceData:RecviceDataModel=new Object();
    
   RecviceData.title = VV_temjson.title;
   RecviceData.classID = VV_temjson.classID;
   var NodeArray=new Array();
   for(let index=0;index < VV_temjson.node.length;index++) //解析node
   {
       var RecviceNode:RecviceNodeModel = new Object();
       RecviceNode.title = VV_temjson.node[index].title;
       RecviceNode.input = VV_temjson.node[index].input;
       RecviceNode.classID = VV_temjson.node[index].classID;
       RecviceNode.placeholder = VV_temjson.node[index].placeholder;
       RecviceNode.type = VV_temjson.node[index].type;
       RecviceNode.use = VV_temjson.node[index].use;
       RecviceNode.maxLength = VV_temjson.node[index].maxLength;
       RecviceNode.minLength = VV_temjson.node[index].minLength;
      RecviceNode.source = VV_temjson.node[index].source;
     
       //解析restriction
       RecviceNode.restriction = new Object();
       var patternArray=new Array();
       for(let resindex =0 ;resindex < VV_temjson.node[index].restriction.length ; resindex ++)
       {
         var temppattern:patternModel = new Object();
         temppattern.pattern = VV_temjson.node[index].restriction[resindex].pattern;
         temppattern.error_message = VV_temjson.node[index].restriction[resindex].error_message;
          patternArray.push(temppattern);
           
       }
       RecviceNode.restriction.patternM = patternArray;
      
       NodeArray.push(RecviceNode);
       this.state.SaveValueDict[RecviceNode.classID]='';
   }
    RecviceData.node=NodeArray ;
   this.setState({ALLRecviceData:RecviceData});




  }

  renderList(){
    return this.state.ALLRecviceData.node.map( (item,index) => this.renderItem(item,index) );
  }
    renderItem(item,index) {

      var RecviceNode:RecviceNodeModel = item;

      
    return (
           <ShowView key={index} nodeM ={RecviceNode} ref={RecviceNode.classID}
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
       RecviceNode.input = 'edit';
       RecviceNode.classID = 'itemEdit';
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

   //重新封装json
   var finalInfoStr = JSON.stringify(this.state.ALLRecviceData);
   var finalInfo = JSON.parse(finalInfoStr);
    console.log(finalInfo);

  }

  render(){
    return <ScrollView contentContainerStyle={{ paddingVertical: 20 }}
      keyboardDismissMode='interactive'
      contentInset={{ bottom: this.state.keyboardSpace }}
      showsVerticalScrollIndicator={true}
    >
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
    </ScrollView>
  }


    //字符串匹配正则表达式
    checkValueFunc(text,ClassType)
    {
         
         var ALLnodeArray = this.state.ALLRecviceData.node;
        for(let nodeindex=0;nodeindex < ALLnodeArray.length;nodeindex++)
        {
              if(ALLnodeArray[nodeindex].classID == ClassType)
              {

            console.log(ALLnodeArray[nodeindex].title);

         if(ALLnodeArray[nodeindex].restriction.patternM.length < 1)
         {
             return true;
         }
        
         if(text.length == 0 && (ALLnodeArray[nodeindex].use == "required"))
         {
             console.log(`${ALLnodeArray[nodeindex].title}为必输项`);
             return false;
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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
  },
});








