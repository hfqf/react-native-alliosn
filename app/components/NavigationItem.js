import React, { Component } from 'react';
import {StyleSheet, Text,TouchableOpacity,View,Image} from 'react-native'

import {SCREEN_WIDTH,SYSTEM,COLOR} from '../util/config';

export default ({isH5,itemDirection,isIcon,isShow,isBackBtn,alignItems,textAlign,marginLeft,callback,width,height,image,borderRadius,fontSize,title,style,titleColor,disabled ,...props}) => {
  return (

      <TouchableOpacity onPress={callback}
                        onStartShouldSetResponderCapture={true}
                        onMoveShouldSetResponderCapture={true} >
          {isShow?<View style={[styles.container,style]}
                                                          onStartShouldSetResponderCapture={()=>{true}}
                                                          onMoveShouldSetResponderCapture={()=>{true}}>
              { isBackBtn?
              <Image style={{
                  margin:0,
                  marginLeft:-4,
                  width:30,
                  height:30,
                  justifyContent:'center',
                  position: 'absolute'}}
                      resizeMode="contain"
                      source={(isH5&&title != '') ?{uri:title}: require('../resource/allison/top_return.png')}
              />:
                  isIcon?
                  <Image style={{
                  margin:0,
                  marginLeft:itemDirection?0:10,
                  width:30,
                  height:30,
                  justifyContent:'center',
                  position: 'absolute'}}
                  resizeMode="contain"
                  source={{uri:title}}
                  />
                      :
                  <Text style={{
                  numberOfLines:1,
                  marginLeft:0,
                  marginRight:0,
                  alignItems:alignItems == undefined ?'center':alignItems,
                  textAlign:textAlign == undefined ?'center':textAlign,
                  backgroundColor:'transparent',
                  fontSize:fontSize==undefined?18:fontSize,
                  color: titleColor == undefined ?'white':titleColor}}>
                      {title}
                  </Text>
                  }
          </View>:<View style={[styles.container,style]}/>}

      </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
    bgStyle: {
        margin:0,
        // marginLeft:-20,
        // marginRight:-20,
        justifyContent:'center',
        position: 'absolute',
        backgroundColor: 'transparent',
    },
  container:{
  // margin:20,
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
