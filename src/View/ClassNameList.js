/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React, { Component } from 'react';
import {
  InteractionManager,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  ListView,
  RefreshControl,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
} from 'react-native';
var NUM_SECTIONS = 10;
var NUM_ROWS_PER_SECTION = 10;
let cellNums = 4;

    var dataBlob = {};
    var sectionIDs = [];
    var rowIDs = [];

    var didSlectItemArray = [];

import Dimen from './../utils/dimission'
import { toastShort } from '../utils/ToastUtil';
import BtnView from './BtnView';
export type ListViewCellModel = {

  title:string,
  classID:number,
  isShow: boolean,
  isSelected:boolean,
};
export type ListViewSectionModel = {

  title:string,
  classID:number,
  isOpen: boolean,
};
export default class ClassNameList extends Component {
    
    constructor(props) {
    super(props);
    var getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };
    var getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[rowID];
    };
var ds = new ListView.DataSource({
      getRowData: getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

    this.state = {
      IsShow:false,
      isOneHang: true,
      isEditCell:false,
      dataSource: ds.cloneWithRowsAndSections({}, [], []),
    };
  }

    componentWillMount() {
 this.InitData();
  }  
    AddRenderList() { 
      

      
    }
    
    InitData() {
     dataBlob = {};
     sectionIDs = [];
     rowIDs = [];
    for (var ii = 0; ii < NUM_SECTIONS; ii++) {
      var tempSection = new Object();
      
      var sectionName = 'SectionLeee ' + ii;
      tempSection.title = sectionName;
      tempSection.isOpen = false;

      sectionIDs.push(sectionName);
      dataBlob[sectionName] = tempSection;
      rowIDs[ii] = [];

      for (var jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
        var tempCell = new Object();
        var rowName = 'S' + ii + ', R' + jj;
        tempCell.title = rowName;
        tempCell.isShow =  false;
        tempCell.isSelected = false;
        rowIDs[ii].push(rowName);
        dataBlob[rowName] = tempCell;
      }
    }
    this.setState({dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)});

    }

    RefreshData(selectedSectionData, selectedRowData) {
     dataBlob = {};
     sectionIDs = [];
     rowIDs = [];
    for (var ii = 0; ii < NUM_SECTIONS; ii++) {
      var tempSection = new Object();
      
      var sectionName = 'SectionLeee ' + ii;
      tempSection.title = sectionName;
      if ( selectedSectionData != null && selectedSectionData.title == sectionName  ) {
       tempSection.isOpen = selectedSectionData.isOpen;
      }
      else
      tempSection.isOpen = false;
      tempSection.classID = ii;
      sectionIDs.push(sectionName);
      dataBlob[sectionName] = tempSection;
      rowIDs[ii] = [];

      for (var jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
        var tempCell = new Object();
        var rowName = 'S' + ii + ', R' + jj;
        tempCell.title = rowName;
        tempCell.classID = jj;
        if (selectedSectionData != null &&selectedSectionData.title == sectionName) {
          tempCell.isShow =  selectedSectionData.isOpen;
        } else {
          tempCell.isShow =  false;
        }
        
          tempCell.isSelected = false;
        if (didSlectItemArray.length > 0 && didSlectItemArray.indexOf(tempCell.title) > -1) {
  
            tempCell.isSelected = true;

            
        } 

        
        rowIDs[ii].push(rowName);
        dataBlob[rowName] = tempCell;
      }
    }
    this.setState({dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)});

 } 

  render() { 
   
   var tempStyle = this.state.isOneHang ?styles.ListViewTypeV :styles.ListViewTypeH;
    return (
      <View style={{ backgroundColor: 'rgb(240, 239, 243)', flex: 1,top:20 }}>
        <SeachView ChangeThremeClickBackFunc={() => {
          var tempOne = this.state.isOneHang;
          this.setState({ isOneHang: !tempOne });
        }}
          EditClickBackFunc={() => {

            var tempisEditCell = !this.state.isEditCell;
            this.setState({isEditCell:tempisEditCell});
          }}
          DidSelectClickBackFunc={() => { 
     
          }}
        />

          <ListView style={{ backgroundColor: 'white' }}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            contentContainerStyle={tempStyle}
            renderSectionHeader={this.renderSectionHeader}
            removeClippedSubviews={false}
            initialListSize={10000}  
        />    
       </View>
    );

  }  
 
 onButtonPress(){
    var tempOne = this.state.isOneHang;
    this.setState({isOneHang:!tempOne});
 }
 renderSectionHeader = (sectionData, sectionID) => {
   var tempImageSource;
   if (sectionData.isOpen) {
     if (this.state.isEditCell) {
       tempImageSource = require('./../../Image/手机加密/收起-灰.png');
     } else { 
       tempImageSource = require('./../../Image/手机加密/收起-绿.png');
     } 
     
   } else {
      tempImageSource = require('./../../Image/手机加密/展开-灰.png');
   }
   var tempTextColor = sectionData.isOpen ? '#2aa5a9':'#333333';
   return (
      <TouchableOpacity onPress={() => {
        var tempSectionData = sectionData;
        tempSectionData.isOpen = !tempSectionData.isOpen;
        this.RefreshData(tempSectionData, null);
     }}>
        <View style={{backgroundColor:'rgb(243,243,243)',height:5,width:Dimen.window.width}} />  
        <View style={{width: Dimen.window.width,height: 40,backgroundColor: 'white',flexDirection:'row',alignItems:'center',overflow:'hidden'}}>
       <Image source={tempImageSource} style={{ height: 5, width: 6 ,marginLeft:10}} />  
       <Text style={{marginLeft:10,fontSize:14,color: tempTextColor,textAlign:'left'}}>{sectionData.title}</Text>
        </View>
        <View style={{marginLeft:0,marginRight:0,marginBottom:0,height:1,backgroundColor:'#e9e9e9'}}/>
      </TouchableOpacity>
    );
 };
  

 didCellClick =(rowData,sectionID)=>{
         var temprowData: ListViewCellModel = rowData;
          var index = didSlectItemArray.indexOf(rowData.title);
          if (index > -1) {
            didSlectItemArray.splice(index, 1);
          } else {
            didSlectItemArray.push(rowData.title)
          }
         temprowData.isSelected = !rowData.isSelected;
         var abc: ListViewSectionModel = dataBlob[sectionID];
      
         this.RefreshData(abc, temprowData);
 }

  _renderRow(rowData, sectionID, rowID) {
    var temprowData: ListViewCellModel = rowData;
    if (temprowData.isShow) {
    return (
      <TouchableOpacity onPress={this.didCellClick.bind(this,rowData,sectionID)}>
        {this.state.isOneHang ? <CellSignView rowData={temprowData} isEditCell={this.state.isEditCell} isSelected={temprowData.isSelected}/> :
          <CellMultiView rowData={temprowData} isEditCell={this.state.isEditCell} isSelected={temprowData.isSelected}/>}
      </TouchableOpacity>
    );
    }
    else
    { 
    return (<View />);
    }  
      

    

  }
  

}

var styles = StyleSheet.create({
  ListViewTypeH: {
   // 主轴方向
    flexDirection:'row',
  // 换行
    flexWrap:'wrap'
  },
 ListViewTypeV: {
   // 主轴方向
    flexDirection:'column',
            // 换行
    flexWrap:'nowrap'
  },
  rowType: {
    margin:7,
     backgroundColor: 'white',
  },
  rowInputType: {
    margin:7,
     height: 25
  },

  textinputtype: {
    flex: 1,
    width: 100,
    height: 25
  },
  sectionClose: {
    width: Dimen.window.width,
    height: 40,
    backgroundColor: '#f3f2f2',
  },
  sectionOpen: {
    width: Dimen.window.width,
    height: 40,
    backgroundColor: 'rgb(243,242,242)',
  },



});

class SeachView extends Component { 
  constructor(props) { 
    super(props);
    this.state = {
      EditClickBackFunc: null,
      ChangeThremeClickBackFunc: null,
      DidSelectClickBackFunc:null,
    }
  }
  render() { 
    return (

      <View style={{width:Dimen.window.width,height:40,flexDirection:'row',justifyContent:'flex-start'}}>
        <TouchableOpacity activeOpacity={0.6} onPress={this.ChangeThremeClickBackFunc.bind(this)}
          style={{width:40,height:40}} >
       <Image source={require('./../../Image/手机加密/缩略图.png')} style={{width:20,height:20,marginLeft:10,marginTop:10}}/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={this.DidSelectClickBackFunc.bind(this)} >
        <View style={{ width: Dimen.window.width-100, height: 30,flexDirection:'row',justifyContent:'center',alignContent:'center',flex:1,  backgroundColor: 'rgb(233,233,233)', borderRadius: 5 ,marginTop: 5}}>
          <Image source={require('./../../Image/手机加密/搜索icon.png')} style={{ width: 18, height: 18,marginTop:4 }} />
          <Text style={{fontSize:14,color:'#d2d2d2',textAlign:'left',marginTop:7,marginLeft:2}}>搜索</Text> 
          </View>
         </TouchableOpacity>  
        <Button title='编辑' color='rgb(50,165,168)' onPress={this.EditClickBackFunc.bind(this)} style={{ width:44,height:40, marginRight: 5, marginTop: 15 }}/>
      </View>

    );
  }  
  EditClickBackFunc()
  { 
        if(this.props.EditClickBackFunc == null) return;
        this.props.EditClickBackFunc();
  }
  ChangeThremeClickBackFunc()
  { 
        if(this.props.ChangeThremeClickBackFunc == null) return;
        this.props.ChangeThremeClickBackFunc();
  }
    DidSelectClickBackFunc()
  { 
        if(this.props.DidSelectClickBackFunc == null) return;
        this.props.DidSelectClickBackFunc();
  }
  

}

class CellMultiView extends Component { 
  render() { 
    var tempselectImage = this.props.isSelected ? require('./../../Image/手机加密/选择-青.png') :require('./../../Image/极密盾加密/未选择.png')
    var tempbackColor;
    if (this.props.isSelected == false && this.props.isEditCell) {
      tempbackColor = '#cccccc';
    } else  {
      tempbackColor = '#5fc2c5';
    } 
    return (
      <View style={{ height: 81, width: Dimen.window.width/4, backgroundColor: 'white',marginTop:2 }}>
        <View style={{flexDirection:'row'}}>
          <View style={{marginLeft:30, width:40,height:40,backgroundColor:tempbackColor,justifyContent:'center',alignContent:'center',borderRadius:10}}>
        <Image source={require('./../../Image/邮件24.png')} style={{height: 24,width: 24,marginLeft:8}} />
          </View>
          {this.props.isEditCell ? <Image source={tempselectImage} style={{ height: 16, width: 16, marginTop: 0, marginLeft: 5 }} /> : <View />} 
        </View>
        <Text style={{ fontSize: 13, color: '#cccccc', textAlign: 'center',marginLeft:1,marginRight:10,marginTop:3 }}
          textAlign='center' >
              一二三四五 六七
        </Text>
</View>
    );

  }
}
class CellSignView extends Component { 
  render() { 
    var tempselectImage = this.props.isSelected ? require('./../../Image/手机加密/选择-青.png') :require('./../../Image/极密盾加密/未选择.png')
    var tempbackColor;
    if (this.props.isSelected == false && this.props.isEditCell) {
      tempbackColor = '#cccccc';
    } else  {
      tempbackColor = '#5fc2c5';
    } 
    return(
      <View style={{ flexDirection:'row',height: 80, width: Dimen.window.width, marginBottom: 10, backgroundColor: 'white'}}>
        <View style={{width:60,height:60,backgroundColor:tempbackColor, justifyContent: 'center', alignItems:'center',borderRadius:10,marginTop:12,marginLeft:10}}> 
          <Image source={require('./../../Image/邮件32.png')}
            style={{height: 32, width: 32}} />
        </View>
        <View style={{flexDirection:"column"}}>
        <View style={{backgroundColor: 'white',flexDirection:'row'}}> 
          <View style={{backgroundColor: 'white',flexDirection:'column',width:Dimen.window.width-116}}>
            <Text style={{ fontSize: 20, color: '#2aa5a9', textAlign: 'left',marginTop:6,marginLeft:10 }}>新浪微博</Text>
            <Text style={{ fontSize: 12, color: '#999999', textAlign: 'left',marginTop:9,marginLeft:10 }}>jimidun@jimidun.com copy 5</Text>
            <Text style={{ fontSize: 12, color: '#999999', textAlign: 'left' ,marginTop:6,marginLeft:10}}>这里是描述信息或者其他信息 copy</Text>
        
            </View>
          {!this.props.isEditCell ?
            <View style={{ backgroundColor: 'white', flexDirection: 'column', width: 36 }}>
            <View style={{ flexDirection: 'row' ,marginTop:40}}>
            <Image source={require('./../../Image/极密盾加密/icon-附件.png')}
                style={{ height: 16, width: 16 }} />
            <Text style={{ fontSize: 9, color: '#999999', textAlign: 'left' ,marginLeft:2,marginTop:5}}>3</Text>  
            </View>
            <Text style={{ fontSize: 12, color: '#999999', textAlign: 'left' ,marginTop:8}}>今天</Text>
              </View>
              :
              <View style={{ backgroundColor: 'white', flexDirection: 'column', width: 36, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={tempselectImage} style={{ height: 16, width: 16, marginTop: 0, marginLeft: 5 }} />
              </View>}  

          </View>
              <View style={{marginLeft:0,marginRight:0,marginTop:10,height:1,backgroundColor:'#e9e9e9'}}/>  
        </View>
        </View>
    );

  }
}