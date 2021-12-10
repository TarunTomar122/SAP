import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import {color, size, typography} from '../theme';

const Button = props => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, props.style, styles.elevation]}
        onPress={props.onPress}>
        <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  elevation: {
    elevation: size.scale(6),
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: size.scale(10),
  },
  button: {
    backgroundColor: color.background,
    borderColor: color.primary,
    borderWidth: 1,
    padding: size.scale(10),
    borderRadius: size.scale(10),
    marginVertical: size.scale(20),
    width: size.scale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: color.primary,
    fontSize: size.scale(18),
    fontFamily: typography.primaryBold,
  },
});

export default Button;
