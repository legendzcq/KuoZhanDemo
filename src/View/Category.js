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

var temparray = [];
import Dimen from './../utils/dimission'
import { toastShort } from '../utils/ToastUtil';
export default class Category extends Component {
    
    constructor(props) {
    super(props);
    global.JMDcategory = this;
    
    this.state = {
      IsShow:false,
      dataArray: [],
      dataArrayBtoom:[],
      dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
    };
  }

    componentWillMount() {
     temparray = ['row 1', 'row 2', 'fasdffsadfsadfd', 'dddf', 'sdfads', 'asdf', 'ddccc', 'adftwertewr', '预留'];
     this.setState({ dataArray: temparray });  
  }  
    AddRenderList() { 
      
      this.setState({ IsShow: true ,dataArrayBtoom:temparray});
      
    }
    
  render() { 
   
    return (
      <View style={{ backgroundColor: 'rgb(240, 239, 243)' ,marginTop:20,marginBottom:0,marginLeft:0,marginRight:0}}>
        <ListView style={{backgroundColor:'white'}}
          dataSource={this.state.dataSource.cloneWithRows(this.state.dataArray)}
          renderRow={this._renderRow}
          contentContainerStyle={styles.ListViewType}

        />    
              
        <Button
          onPress={() => { this.AddRenderList(); }}
          title="保存"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        /> 
        {
          this.state.IsShow ?
         <ListView style={{backgroundColor:'rgb(240, 239, 243)'}}
          dataSource={this.state.dataSource.cloneWithRows(this.state.dataArray)}
          renderRow={this._renderRowBtoom}
          contentContainerStyle={styles.ListViewType}

            />    
        : <View style={{ backgroundColor: 'rgb(240, 239, 243)'}}/>    
        }
      </View>
    );

  }  

    
  _renderRow(rowData, sectionID, rowID) {
    
    if (rowData == '预留') {

      return (
      <View style={styles.rowInputType}>
          <TextInput style={styles.textinputtype}
            placeholder="输入标签"
            autoCapitalize="none"
            placeholderTextColor={'#cccccc'}
            autoCorrect={false}
            returnKeyType='done'
            blurOnSubmit={true}
            onChangeText={(text) => {
              
              global.JMDcategory.setState({ IsShow: text.length ? false: true });
            }}
            onSubmitEditing={(event) => { 
              
              if (event.nativeEvent.text == '' || event.nativeEvent.text == null) {

              }
              else
              {
              temparray.splice(temparray.length - 1, 0, event.nativeEvent.text);
              global.JMDcategory.setState({ dataArray: temparray });  
               }  
              

            }
              
            }
           />           
      </View>
      );      


    }
    else
    { 
    return (
      <TouchableOpacity onPress={() => {
        temparray.splice(rowID,1);
              global.JMDcategory.setState({ dataArray: temparray });  
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
  

_renderRowBtoom(rowData, sectionID, rowID) {
    
  if (rowData != '预留') {
    return (

        <View>
          <View style={styles.rowType}>
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
        </View>
    );
  } else { 
        return (
       <View />
    );
  }


  }  

}

var styles = StyleSheet.create({
  ListViewType: {
   // 主轴方向
            flexDirection:'row',
            // 换行
            flexWrap:'wrap'
  },
  rowType: {
    margin:7,
    borderColor: 'rgb(31, 168, 32)',
     borderStyle:'solid',
     backgroundColor: 'white',
     height: 25,
     borderWidth: 0.7,
     borderRadius:15,
  },
  rowInputType: {
    margin:7,
     height: 25
  },
  text: {
    flex: 1,
    marginTop: 4,
    marginBottom:4,
    marginLeft: 7,
    marginRight:7,
     color:'rgb(31, 168, 32)'
  },
  textinputtype: {
    flex: 1,
    width: 100,
    height: 25
  }
});