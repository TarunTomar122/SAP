import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {color, size} from '../theme';

const FloatingButton = props => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
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
    bottom: 120,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: color.primaryDarker,
    fontSize: size.scale(24),
  },
});

export default FloatingButton;
