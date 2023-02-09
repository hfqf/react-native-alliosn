import React, { Component } from 'react';
import {StyleSheet, Text,TouchableOpacity,View} from 'react-native'

import {SCREEN_WIDTH,SYSTEM,COLOR} from '../util/config';

export default ({callback,borderRadius,fontSize,title,style,titleColor,disabled ,...props}) => {
  return (
    <View style={[styles.container,style]}
          onStartShouldSetResponderCapture={()=>{true}}
          onMoveShouldSetResponderCapture={()=>{true}}>
    <TouchableOpacity onPress={callback} disabled={disabled}
                      onStartShouldSetResponderCapture={true}
                      onMoveShouldSetResponderCapture={true} >
      <Text style={{
          // textDecorationLine:'underline',
          // textDecorationColor:'black',
          marginLeft:5,
          marginRight:5,
          alignItems:'center',
          textAlign:'center',
          backgroundColor:'transparent',
          fontSize:fontSize==undefined?18:fontSize,
          color: titleColor == undefined ?'white':titleColor
      }}>{title}</Text>
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
    container2:{
        marginRight:20,
        height:50,
        backgroundColor:COLOR.theme,
        borderRadius:5,
        justifyContent:'center'
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
