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
import CabIphoneView from './CabIphoneView'
import CabBleView from './CabBleView'

let CabPageNum = 5;
var isopen = 'open';


let classNameTitle = ['常用账户','钱包支付','金融理财','身份证照','合同发票','联系人'];
let otherTitle = ['密码页', '密条'];
let tagTitle = ['标签1', '标签2', '标签1', '标签2', '标签2'];
export default class Cabinetinterface extends Component {
   constructor(props)
   {
     super(props);
     global.CabinetinterfaceREF = this;
     this.state = {
      dataArray: [],
      otherdataArray: [],   
      tagdataArray: [],   
      ClassDataNumArray: [],
      currentPage:0,
     }

    // NativeModules.ParamsProviderModule.initShowValue()
    //     .then(param => {

    //         this.setState({ClassDataNumArray:param});    
               
    //      });  
       
   }

 componentWillMount() {
     this.setState({ dataArray: classNameTitle });  
     this.setState({ otherdataArray: otherTitle });  
     this.setState({ tagdataArray: tagTitle });  

  }   

 render() {
     return (
         <ScrollView
                //组件的唯一标示
                ref="scrollView"
                //*设置子组件横向排列
                horizontal={true}
                // 隐藏水平滚动条
                showsHorizontalScrollIndicator={false}
                // 设置自动分页
                pagingEnabled={true}
                contentContainerStyle={{ paddingVertical: 0 }}
                style={{ backgroundColor: 'white' }}
                   // 当滚动结束的时候
                onMomentumScrollEnd={(scrollView)=>this.onAnimationEnd(scrollView)} 
         >
                 
                 {this.renderAllImage()}
                 
             </ScrollView>    
     );
       
 }
    // 当滚动结束的时候调用
    onAnimationEnd(scrollView){
        // 求出水平方向上的偏移量
        var offSetX = scrollView.nativeEvent.contentOffset.x;
        // 求出当前的页数
        var currentPage = Math.floor(offSetX/Dimen.window.width); // 求出的页数转成整数
        // 更新状态机,重新绘制UI
        this.setState({
            currentPage:currentPage
        });
        // alert(currentPage);
    }
     // 添加所有view
    renderAllImage(){
        // 数组
        var allImage = [];
        allImage.push(<CabIphoneView key={0}
            CabPageNum={CabPageNum + 1}
            currPageNume={0}
            slideViewPressBackFunc={this.slideViewPress.bind(this)}
            SearchViewPressBackFunc={this.SearchViewPress.bind(this)}
            AddViewPressBackFunc={this.AddViewPress.bind(this)}
        />);
        // 遍历数组
        for (var i=0;i<CabPageNum;i++){
            // 创建组件装入数组
            allImage.push(
            <CabBleView key={i + 1} CabPageNum={CabPageNum + 1} currPageNume={i + 1}
            slideViewPressBackFunc={this.slideViewPress.bind(this)}
            SearchViewPressBackFunc={this.SearchViewPress.bind(this)}
            AddViewPressBackFunc={this.AddViewPress.bind(this)}
                />
            );
        }
        // 返回数组
        return allImage;
    }

    
    slideViewPress() { 
     NativeModules.ParamsProviderModule.slideViewClick(isopen).then(result => {
            isopen == 'open' ? isopen ='close' :isopen= 'open'; 
    }, error => {
    isopen == 'open' ? 'close' : 'open';     
    });
    }    
    SearchViewPress() { 
     NativeModules.ParamsProviderModule.slideViewClick(isopen).then(result => {
            isopen == 'open' ? isopen ='close' :isopen= 'open'; 
    }, error => {
    isopen == 'open' ? 'close' : 'open';     
    });
    }    
    AddViewPress() { 
     NativeModules.ParamsProviderModule.slideViewClick(isopen).then(result => {
            isopen == 'open' ? isopen ='close' :isopen= 'open'; 
    }, error => {
    isopen == 'open' ? 'close' : 'open';     
    });
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


var styles = StyleSheet.create({
     headContainer: {
        position: 'absolute',
        top: 36,
        width: 44,
        height:44,
    },


});