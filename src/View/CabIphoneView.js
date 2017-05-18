
import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    ListView,
    NativeModules,
    DeviceEventEmitter,
    PanResponder,//触摸必要的组件
} from 'react-native';
import Dimen from './../utils/dimission';
import { toastShort } from '../utils/ToastUtil';
let showClassNameNum = 3;

//手机加密分类图标
let classNameIconIphone = [require('./../../Image/手机加密/常用账户-青.png'),
    require('./../../Image/手机加密/钱包-青.png'),
    require('./../../Image/手机加密/金融理财-青.png'),
    require('./../../Image/手机加密/身份证照-青.png'),
    require('./../../Image/手机加密/合同发票-青.png'),
    require('./../../Image/手机加密/联系人-青.png')];
let otherIconArrayIphone = [require('./../../Image/手机加密/密码页-青.png'), require('./../../Image/手机加密/密条-青.png')];
let classNameTitle = ['常用账户','钱包支付','金融理财','身份证照','合同发票','联系人'];
let otherTitle = ['密码页', '密条'];
let tagTitle = ['标签1', '标签2', '标签1', '标签2', '标签2'];

export default class CabIphoneView extends Component {
   constructor(props)
   {
     super(props);
     global.CabinetinterfaceIphone = this;
     this.state = {
      dataArray: [],
      otherdataArray: [],   
      tagdataArray: [],   
      ClassDataNumArray: [],
      eventName:'',
      pos: '',
      ishadLeftSwitch: true   ,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      otherdataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      tagdataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      slideViewPressBackFunc: null,
      SearchViewPressBackFunc: null,
      AddViewPressBackFunc: null,
         
     }
   }

 componentWillMount() {
     this.setState({ dataArray: classNameTitle });  
     this.setState({ otherdataArray: otherTitle });  
     this.setState({ tagdataArray: tagTitle });  

  }   


    render() {
        
        return (
            <ScrollView contentContainerStyle={{ paddingVertical: 0 }}
                style={{ backgroundColor: 'white' }}
             // 隐藏水平滚动条
                showsVerticalScrollIndicator={false}
            >
                <Image source={require('./../../Image/手机加密/IphoneBackgroundImage.png')} style={styles.backgroundImageStyle} >
                <BtnView iconName={require('./../../Image/手机加密/DevListIcon.png')} BtnClickBackFunc={this.slideViewPressBackFunc.bind(this)} Touchstyle={[styles.headContainer, {left:10}]}/> 
                <BtnView iconName={require('./../../Image/手机加密/Combined Shape.png')} BtnClickBackFunc={this.SearchViewPressBackFunc.bind(this)} Touchstyle={[styles.headContainer, {left:Dimen.window.width-38-10}]} /> 
                <BtnView iconName={require('./../../Image/手机加密/seachcopy.png')} BtnClickBackFunc={this.AddViewPressBackFunc.bind(this)} Touchstyle={[styles.headContainer, {left:Dimen.window.width-38-70}]}/>   


                    <View style={{top:75,backgroundColor:'rgba(255,255,255,0.0)'}}>
                    <Text style={{fontSize:18,color: '#ffffff',textAlign:'center',width:200,left:(Dimen.window.width-200)*0.5}}>我的极密盾</Text>
                    <Text style={{ fontSize: 12, color: '#ffffff', textAlign: 'center', width: 200, left: (Dimen.window.width - 200) * 0.5, marginTop: 5 }}>(手机加密)</Text>
                    </View>    
                    <View style={{flexDirection:'row',justifyContent:'center',marginTop:94,width:Dimen.window.width,height:30}}>
                        {this.renderAllImage()}
                    </View>
                    
                </Image>


                {/*分类*/}          
                <View style={{backgroundColor:'white'}}>
                <TagLineView ViewStyle={styles.TagLineViewLeftIphone} titleName='分类' />
                <ListView style={{backgroundColor:'white',width:Dimen.window.width}}
                dataSource={this.state.dataSource.cloneWithRows(this.state.dataArray)}
                renderRow={this._renderRowClassName}
                contentContainerStyle={styles.ListViewType}
                />    
                </View>    
                {/*其他*/}          
               <View style={{backgroundColor:'white'}}>
                <TagLineView ViewStyle={styles.TagLineViewLeftIphone} titleName='其他' />
                <ListView style={{backgroundColor:'white',width:Dimen.window.width}}
                dataSource={this.state.otherdataSource.cloneWithRows(this.state.otherdataArray)}
                renderRow={this._renderRowOther}
                contentContainerStyle={styles.ListViewType}
                />    
                </View>    
                {/*标签*/}          
               <View style={{backgroundColor:'white'}}>
                <TagLineView ViewStyle={styles.TagLineViewLeftIphone} titleName='标签' />
                <ListView style={{backgroundColor:'white',width:Dimen.window.width}}
                dataSource={this.state.tagdataSource.cloneWithRows(this.state.tagdataArray)}
                renderRow={this._renderRowTag}
                contentContainerStyle={styles.ListViewType}
                />    
                </View>    

            </ScrollView>
        );
    }
     // 添加所有view
    renderAllImage() {
        // 数组
        var allImage = [];
        // 遍历数组
        for (var i=0;i<this.props.CabPageNum;i++){
            // 创建组件装入数组
            if (this.props.currPageNume== i) {
           allImage.push(
                <Image key={i} source={require('./../../Image/手机加密/Oval 4.png')} style={styles.roundType}/>
            );
            }
            else
            { 
           allImage.push(
                <Image key={i} source={require('./../../Image/手机加密/Oval 4 Copy.png')} style={styles.roundType}/>
            );
            }    
 
        }
        // 返回数组
        return allImage;
    }

    _renderRowClassName(rowData, sectionID, rowID) {

      let ImageLeft = (Dimen.window.width / showClassNameNum - 32)/2;
      return (
          <TouchableOpacity onPress={() => {
              {/*NativeModules.ParamsProviderModule.ClassNameClick(rowData).then(result => {
              }, error => {  
               });*/}
              
          }}>
      <View style={styles.CellType}>
              <Image source={classNameIconIphone[rowID]} style={{width:32,height:31,marginTop:15,marginLeft:ImageLeft}} />
              <Text style={{fontSize:14,color:'#666666',textAlign:'center',margin:5}}>{rowData}</Text>
              <Text style={{ fontSize: 10, color: '#999999', textAlign: 'center' }}>{ global.CabinetinterfaceIphone.state.ClassDataNumArray[rowData] }条</Text>
     </View>
    </TouchableOpacity>        
      );      

    }
      _renderRowOther(rowData, sectionID, rowID) {

      let ImageLeft = (Dimen.window.width / showClassNameNum - 32)/2;
      return (
          <TouchableOpacity onPress={() => {
              {/*NativeModules.ParamsProviderModule.ClassNameClick(rowData).then(result => {
              }, error => {  
               });*/}
              
          }}>
      <View style={styles.CellType}>
              <Image source={otherIconArrayIphone[rowID]} style={{width:32,height:31,marginTop:15,marginLeft:ImageLeft}} />
              <Text style={{fontSize:14,color:'#666666',textAlign:'center',margin:5}}>{rowData}</Text>
              <Text style={{ fontSize: 10, color: '#999999', textAlign: 'center' }}>{ global.CabinetinterfaceREF.state.ClassDataNumArray[rowData] }条</Text>
     </View>
    </TouchableOpacity>        
      );      

      }
    //构建 Tag  Cell
      _renderRowTag(rowData, sectionID, rowID) {

      let ImageLeft = (Dimen.window.width / showClassNameNum - 32)/2;
      return (
          <TouchableOpacity onPress={() => {
              {/*NativeModules.ParamsProviderModule.ClassNameClick(rowData).then(result => {
              }, error => {  
               });*/}
              
          }}>
      <View style={styles.CellType}>
              <Image source={require('./../../Image/手机加密/TagIcon.png')} style={{width:32,height:31,marginTop:15,marginLeft:ImageLeft}} />
              <Text style={{fontSize:14,color:'#666666',textAlign:'center',margin:5}}>{rowData}</Text>
              <Text style={{ fontSize: 10, color: '#999999', textAlign: 'center' }}>{ global.CabinetinterfaceREF.state.ClassDataNumArray[rowData] }条</Text>
     </View>
    </TouchableOpacity>        
      );      

      }  

    slideViewPress() { 
    //  NativeModules.ParamsProviderModule.slideViewClick(isopen).then(result => {
    //         isopen == 'open' ? isopen ='close' :isopen= 'open'; 
    // }, error => {
    // isopen == 'open' ? 'close' : 'open';     
    // });
    }    


    slideViewPressBackFunc()
    {
        if(this.props.slideViewPressBackFunc == null) return;
        this.props.slideViewPressBackFunc();
    }
    SearchViewPressBackFunc()
    {
        if(this.props.SearchViewPressBackFunc == null) return;
        this.props.SearchViewPressBackFunc();
        }
    AddViewPressBackFunc()
    {
        if(this.props.AddViewPressBackFunc == null) return;
        this.props.AddViewPressBackFunc();
    }
}


class BtnView extends Component {
   constructor(props)
   {
     super(props);
     this.state={
      BtnClickBackFunc:null,
     }
   }
    render() {
        
        return (
        <View>
                <TouchableOpacity activeOpacity={0.6} onPress={this.BtnClickBackFunc.bind(this)} style={this.props.Touchstyle} >
       <Image source={this.props.iconName} style={{width:18,height:18}}/>
        </TouchableOpacity>
        </View>
        );
    }
        //回调函数 1：返回值  2：calssID  3：正则pi
    BtnClickBackFunc()
    {
        if(this.props.BtnClickBackFunc == null) return;
        this.props.BtnClickBackFunc();
    }
}


class TagLineView extends Component {

    render() {
        
        return (
        <View style={{backgroundColor:'white',height:40,marginTop:0,marginLeft:0,marginRight:0,flexDirection:'row'}}>
                <View style={this.props.ViewStyle}></View>
          <Text style={{ fontSize: 14, color: '#777777', textAlign: 'left', marginTop: 12, marginLeft: 5 }}>{this.props.titleName}</Text>    
        </View>
        );
    }
}


var styles = StyleSheet.create({
  backgroundImageStyle: {
    marginTop:0,
    marginLeft: 0,
    marginRight: 0,
    width:Dimen.window.width
    },
     headContainer: {
        position: 'absolute',
        top: 16,
        width: 44,
        height:44,
  },
     CellType: {
         width: Dimen.window.width / showClassNameNum,
         height: Dimen.window.width / showClassNameNum-30,
         backgroundColor:'white',
     },
    ListViewType: {
   // 主轴方向
   flexDirection:'row',
   // 换行
   flexWrap:'wrap'
     },
    TagLineViewLeftIphone: {
        backgroundColor: '#2aa5a9',
        width: 5,
        height: 16,
        marginLeft: 10,
        marginTop: 12
    },
    roundType: {
        marginLeft:5
    }
});