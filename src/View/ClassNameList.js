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
} from 'react-native';
var NUM_SECTIONS = 10;
var NUM_ROWS_PER_SECTION = 10;

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
      isOneHang:true,
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
      
      var sectionName = 'SectionLeee' + ii;
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
      <View style={{ backgroundColor: 'rgb(240, 239, 243)', flex: 1 }}>
        <SeachView ChangeThremeClickBackFunc={() => {
          var tempOne = this.state.isOneHang;
          this.setState({ isOneHang: !tempOne });
        }}
          EditClickBackFunc={() => {
            
          }}/>

          <ListView style={{ backgroundColor: 'rgb(233,233,233)' }}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            contentContainerStyle={tempStyle}
            renderSectionHeader={this.renderSectionHeader}
            initialListSize={10}
            pageSize={4}
            scrollRenderAheadDistance={500}
            stickySectionHeadersEnabled={true}
        />    
      </View>
    );

  }  
 
 onButtonPress(){
    var tempOne = this.state.isOneHang;
    this.setState({isOneHang:!tempOne});
 }
 renderSectionHeader = (sectionData, sectionID) => {
   var tempImageSource = sectionData.isOpen ? require('./../../Image/极密盾加密/常用账户-橙.png') : require('./../../Image/手机加密/常用账户-青.png');
   var tempTextColor = sectionData.isOpen ? '#333333':'#2aa5a9';
   return (
      <TouchableOpacity onPress={() => {
        var tempSectionData = sectionData;
        tempSectionData.isOpen = !tempSectionData.isOpen;
        this.RefreshData(tempSectionData, null);}}>
        <View style={{width: Dimen.window.width,height: 40,backgroundColor: 'rgb(243,242,242)',flexDirection:'row',alignItems:'center'}}>
       <Image source={tempImageSource} style={{ height: 15, width: 15 ,marginLeft:10}} />  
       <Text style={{marginLeft:10,fontSize:14,color: tempTextColor,textAlign:'left'}}>{sectionData.title}</Text>
        </View>
        <View style={{backgroundColor:'rgb(233,233,233)',height:5,width:Dimen.window.width}} />  
      </TouchableOpacity>
    );
 };
  



  _renderRow(rowData, sectionID, rowID) {
    var temprowData: ListViewCellModel = rowData;
    var tempTextType = temprowData.isSelected ? styles.TextSelectedType : styles.TextNomalType;
    if (temprowData.isShow) {
    return (
      <TouchableOpacity onPress={
        () => {
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
      }>
        {temprowData.isSelected ?<CellSignView rowData={temprowData} /> :<CellMultiView rowData={temprowData} />}
        

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
  Touchstyle: {
    height: 44,
    width:44,
  },
  TextSelectedType: {
    fontSize: 16,
    color:'blue',
  },
  TextNomalType: {
    fontSize: 16,
    color:'black',
  },


});

class SeachView extends Component { 
  constructor(props) { 
    super(props);
    this.state = {
      EditClickBackFunc: null,
      ChangeThremeClickBackFunc:null,
    }
  }
  render() { 
    return (

      <View style={{width:Dimen.window.width,height:44,flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
        <BtnView Touchstyle={[styles.Touchstyle, { marginLeft: 5, marginTop: 13 }]}
          iconName={require('./../../Image/极密盾加密/DevListIcon.png')}
          BtnClickBackFunc={this.ChangeThremeClickBackFunc.bind(this)}/>
        <TextInput placeholder='搜索' style={{ width: 200, height: 44 }} />
        <BtnView Touchstyle={[styles.Touchstyle, { marginRight: 5, marginTop: 13 }]}
          iconName={require('./../../Image/极密盾加密/seachcopy.png')}
        BtnClickBackFunc={this.EditClickBackFunc.bind(this)}/>
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

}

class CellMultiView extends Component { 
  render() { 
    return(
      <View style={{ height: 70, width: 110, margin: 7, backgroundColor: 'white' }}>
        <View style={{flexDirection:'row'}}> 
        <Image source={require('./../../Image/手机加密/常用账户-青.png')} style={{height: 40,width: 40,marginTop: 5, marginBottom: 5,
          marginLeft: 35
        }} />
       <Image source={require('./../../Image/手机加密/选择-青.png')} style={{height: 16,width: 16,marginTop: 0, marginLeft: 19
          }} />
       </View>
        <View style={{height: 20,width: 110,marginBottom: 0,backgroundColor: 'rgb(49,161,164)',alignItems:'center'}}>
          <Text style={{color: 'white'}}>
              {this.props.rowData.title}
            </Text>
            </View>
          </View>
    );

  }
}
class CellSignView extends Component { 
  render() { 
    return(
      <View style={{ flexDirection:'row',height: 80, width: Dimen.window.width, marginBottom: 10, backgroundColor: 'white' }}>
        <View style={{width:80,height:80,backgroundColor:'#2aa5a9', justifyContent: 'center', alignItems:'center'}}> 
          <Image source={require('./../../Image/极密盾加密/常用账户-橙.png')}
            style={{height: 40, width: 40}} />
        </View>
        <View style={{backgroundColor: 'white',flexDirection:'row'}}> 
          <View style={{backgroundColor: 'white',flexDirection:'column',width:Dimen.window.width-116}}>
            <Text style={{ fontSize: 20, color: '#2aa5a9', textAlign: 'left',marginTop:6,marginLeft:10 }}>新浪微博</Text>
            <Text style={{ fontSize: 12, color: '#999999', textAlign: 'left',marginTop:9,marginLeft:10 }}>jimidun@jimidun.com copy 5</Text>
            <Text style={{ fontSize: 12, color: '#999999', textAlign: 'left' ,marginTop:6,marginLeft:10}}>这里是描述信息或者其他信息 copy</Text>
          </View>
          <View style={{ backgroundColor: 'white', flexDirection: 'column', width: 36 }}>
            <View style={{ flexDirection: 'row' ,marginTop:40}}>
            <Image source={require('./../../Image/极密盾加密/常用账户-橙.png')}
                style={{ height: 15, width: 15 }} />
            <Text style={{ fontSize: 9, color: '#999999', textAlign: 'left' ,marginLeft:2,marginTop:5}}>3</Text>  
            </View>
            <Text style={{ fontSize: 12, color: '#999999', textAlign: 'left' ,marginTop:10}}>今天</Text>
          </View>
        </View>
        
          </View>
    );

  }
}