import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

import {COLOR,SCREEN_WIDTH} from '../util/config'

export default ({unReadCount,isNeedArrow,leftImg, leftText, rightText,
                    onPress, containerStyle}) => {
    let leftChild = (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {leftImg
                ? <Image
                    source={leftImg}
                    style={styles.leftImg}
                  />
                : null}
            <Text style={styles.text}>
                {leftText}
            </Text>
            {unReadCount >0  ?<View style={styles.logoStyle1}/>:<View/>}
        </View>
    )
    let rightChild = (
        <Text style={unReadCount >0 ?styles.text2:styles.text1}>
            {unReadCount >0 || isNeedArrow != undefined?rightText:''}
        </Text>
    )
    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}

            >
              <View style={[styles.container, containerStyle]}>
                  {leftChild}
                  {rightChild}
                  {isNeedArrow == undefined?
                  <Image resizeMode="cover" style={styles.logoStyle} source={require('../resource/mine/arrow_right.png')}/>:<View/>}
              </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <View style={[styles.container, containerStyle]}>
                {leftChild}
                {rightChild}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logoStyle:{
        marginRight:20,
        height:13,
        width:7,
    },
    logoStyle1:{
        marginLeft:-25,
        marginTop:-10,
        height:8,
        width:8,
        borderRadius:4,
        backgroundColor:'red'
    },
    container: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'white',
        borderTopWidth: 0,
        backgroundColor:'white'
    },
    leftImg: {
        marginRight: 5,
        width:25,
        height:25,
        marginLeft:20
    },
    text: {
        width:100,
        fontSize:16,
        color: '#484848',
        marginRight:0,
        marginLeft:10
    },
    text1: {
        fontSize:16,
        color: '#8d8d8d',
        marginRight:0,
        marginLeft:80
    },
    text2: {
        // backgroundColor:'blue',
        width:SCREEN_WIDTH/2-40,
        fontSize:16,
        color: 'red',
        textAlign:'right',
        marginRight:0,
    }
})
