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
  Alert,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
var NUM_SECTIONS = 10;
var NUM_ROWS_PER_SECTION = 10;

import Dimen from './../utils/dimission'
import { toastShort } from '../utils/ToastUtil';
export default class ClassNameList extends Component {
    
    constructor(props) {
    super(props);
    var getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };
    var getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[rowID];
    };



    
    this.state = {
      IsShow:false,

      isOneHang:true,
       dataSource : new ListView.DataSource({
      getRowData: getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    }),
    };
  }

    componentWillMount() {
 this.RefreshData();
  }  
    AddRenderList() { 
      

      
    }
    
 RefreshData(){
   alert('dddd');
       var dataBlob = {};
    var sectionIDs = [];
    var rowIDs = [];
    for (var ii = 0; ii < NUM_SECTIONS; ii++) {
      var sectionName = 'Section ' + ii;
      sectionIDs.push(sectionName);
      dataBlob[sectionName] = sectionName;
      rowIDs[ii] = [];

      for (var jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
        var rowName = 'S' + ii + ', R' + jj;
        rowIDs[ii].push(rowName);
        dataBlob[rowName] = rowName;
      }
    }
    this.setState({dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)});

 }

  render() { 
   
   var tempStyle = this.state.isOneHang ?styles.ListViewTypeV :styles.ListViewTypeH;
    return (
      <View style={{ backgroundColor: 'rgb(240, 239, 243)',flex:1 }}>
          <View style={{backgroundColor:'red',width:Dimen.window.width,height:50}} >
         <Button
          title="更换主题"
          color="#841584"
          onPress={()=>{
                  var tempOne = this.state.isOneHang;
    this.setState({isOneHang:!tempOne});
          }}
        />
         </View>
        <ListView style={{backgroundColor:'white'}}
          dataSource={this.state.DatadataSource}
          renderRow={this._renderRow}
          contentContainerStyle={tempStyle}
          renderSectionHeader={this.renderSectionHeader}
          initialListSize={10}
          pageSize={4}
          scrollRenderAheadDistance={500}
          stickySectionHeadersEnabled
        />    
      </View>
    );

  }  
 
 onButtonPress(){
    var tempOne = this.state.isOneHang;
    this.setState({isOneHang:!tempOne});
 }
      renderSectionHeader = (sectionData, sectionID) => {
    return (
    <TouchableOpacity onPress={() => {
         alert(sectionData);
              
          }}>
      <View style={styles.section}>
        <Text style={styles.text}>
          {sectionData}--{sectionID}
        </Text>
      </View>
      </TouchableOpacity>
    );
  };
  _renderRow(rowData, sectionID, rowID) {
    console.log(rowData);
    return (
      <TouchableOpacity onPress={() => {

        }}>
        <View>
          <View style={styles.rowType}>
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    

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
  }
});