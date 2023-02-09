import React, { Component } from 'react';
import {Image,View,Text} from 'react-native'

import {COLOR,SCREEN_WIDTH,SYSTEM,iPAD_DEVICE} from "../util/config";
const  HIGHT_IMAGE = 25;
export default ({tintColor,title,focused,normalImage,selectedImage,...props}) => {
  return (
      <View style={{flex:1,flexDirection:'column',backgroundColor:'white',marginTop:0}}>
          <View style={{height:SYSTEM.Android?HIGHT_IMAGE:25,width:SCREEN_WIDTH/4,marginTop:SYSTEM.Android?0 :(iPAD_DEVICE ?-17:5),justifyContent:'center',alignItems:'center',backgroundColor:'white'}} >
              <Image resizeMode="cover"
                     source={focused ? selectedImage : normalImage }
                     style={ { tintColor:tintColor,width:SYSTEM.Android?HIGHT_IMAGE:25,height:SYSTEM.Android?HIGHT_IMAGE:25,marginTop:0 } }
              />

          </View>
          <Text style={{color:focused?COLOR.theme:'#4a4a4a',textAlign:'center' ,fontSize:14}} >
              {title == undefined ? '' :title}
          </Text>
      </View>
  )
}
