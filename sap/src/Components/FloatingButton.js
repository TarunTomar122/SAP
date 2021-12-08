import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {color, size} from '../theme';

const FloatingButton = props => {
  return (
    <>
      <TouchableOpacity style={[styles.container]} onPress={props.onPress}>
        <AntDesign name="plus" style={styles.icon} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    backgroundColor: color.secondary,
    borderBottomWidth: 1,
    borderBottomColor: '#333b45',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'absolute',
    bottom: size.deviceHeight * 0.16,
    right: size.deviceWidth * 0.06,
    width: size.scale(60),
    height: size.scale(60),
    borderRadius: size.scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: color.primary,
    fontSize: size.scale(24),
  },
});

export default FloatingButton;
