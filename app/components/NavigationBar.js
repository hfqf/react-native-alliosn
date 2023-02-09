import React, { Component } from 'react';
import {StyleSheet, Text,TouchableOpacity,View} from 'react-native'
import NavigationItem from './NavigationItem'
import {SCREEN_WIDTH,SYSTEM,COLOR,NAV_BAR_HEIGHT,STATUS_BAR_HEIGHT} from '../util/config';

export default ({isH5,isLeftItemIcon,isRightItemIcon,isNeedBack,isShowLeftItem,isShowRightItem,leftItmeTitle,rightItmeTitle,onLeftItemCallback,onRightItemCallback,callback,borderRadius,fontSize,title,style,titleColor,disabled ,...props}) => {
  return (
      <View style = {{flexDirection:'row',marginTop:0, backgroundColor:COLOR.theme,width:SCREEN_WIDTH,height:NAV_BAR_HEIGHT,justifyContent:'space-between'}}>
          <NavigationItem isH5={isH5}  isIcon={isLeftItemIcon} itemDirection={true}   fontSize={15} title={leftItmeTitle} isBackBtn={isNeedBack} isShow={isShowLeftItem}  titleColor={'white'} width={40} height={40} textAlign={'left'} alignItems={'flex-start'} image={require('../resource/login1/1.png')} style={{overflow:isShowLeftItem ?'visible':'hidden', backgroundColor:'transparent',marginTop:STATUS_BAR_HEIGHT,marginLeft:10,justifyContent:'center',width:40,height:40}}   callback={onLeftItemCallback} ></NavigationItem>

          <Text style={{
              numberOfLines:1,
              flex:1,
              color:'white',
              fontSize:16,
              marginTop:SYSTEM.iOS ? (STATUS_BAR_HEIGHT+10) :30,
              marginLeft:50,
              textAlign:'center',
              marginRight:50,
              width:SCREEN_WIDTH-100,
              height:20
          }}>
              {title}
             </Text>
          <NavigationItem isH5={isH5} isIcon={isRightItemIcon}  itemDirection={false}  fontSize={15} title={rightItmeTitle} isBackBtn={false} isShow={isShowRightItem}  titleColor={'white'} width={40} height={40} textAlign={'right'} alignItems={'flex-start'} image={require('../resource/login1/1.png')} style={{overflow:isShowRightItem ?'visible':'hidden', backgroundColor:'transparent',marginTop:STATUS_BAR_HEIGHT,marginRight:10,justifyContent:'center',width:40,height:40}}  callback={onRightItemCallback} ></NavigationItem>

      </View>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    container2:{
        marginRight:20,
        height:50,
        backgroundColor:COLOR.theme,
        borderRadius:5,
        justifyContent:'center'
    },

name:{
    paddingLeft:5,
    paddingRight:5,
    textAlign:'center',
    color: 'white'
}
})
