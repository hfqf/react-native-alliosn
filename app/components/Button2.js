import React, { Component } from 'react';
import {StyleSheet, Text,TouchableOpacity,View,Image} from 'react-native'

import {SCREEN_WIDTH,SYSTEM,COLOR} from '../util/config';

export default ({isNeedDecorationLine, alignItems,textAlign,marginLeft,callback,width,height,image,borderRadius,fontSize,title,style,titleColor,disabled ,...props}) => {
  return (
    <View style={[styles.container,style]}
          onStartShouldSetResponderCapture={()=>{true}}
          onMoveShouldSetResponderCapture={()=>{true}}>
    <Image style={{
        margin:0,
        marginLeft:marginLeft==undefined?0:marginLeft,
        width:width,
        height:height,
        justifyContent:'center',
        position: 'absolute'}}
        resizeMode="contain"
        source={image}
    />
    <TouchableOpacity onPress={callback} disabled={disabled}
                      onStartShouldSetResponderCapture={true}
                      onMoveShouldSetResponderCapture={true} >
      <Text style={{
          textDecorationLine:isNeedDecorationLine==undefined?'none':'underline',
          marginLeft:0,
          marginRight:0,
          alignItems:alignItems == undefined ?'center':alignItems,
          textAlign:textAlign == undefined ?'center':textAlign,
          backgroundColor:'transparent',
          fontSize:fontSize==undefined?18:fontSize,
          color: titleColor == undefined ?'white':titleColor
      }}>{title}</Text>
    </TouchableOpacity>
  </View>
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
