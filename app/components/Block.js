import React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'

import {COLOR} from '../util/config';

export default ({children, containerStyle, onPress}) => {
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, containerStyle]}
      >
        {children}
      </TouchableOpacity>
    )
  } else {
    return (
      <View style={[styles.container, containerStyle]}>
        {children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLOR.backgroundLighter
  }
})
