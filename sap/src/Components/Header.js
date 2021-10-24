import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {color, size, spacing} from '../theme';

import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomHeader = props => {
  const {
    leftIcon,
    onLeftPress,
    rightIcon,
    title,
    style,
    titleStyle,
    leftIconStyle,
    rightIconStyle,
  } = props;

  return (
    // <View style={[styles.container, style]}>
    //   <View style={styles.leftIcon}>{leftIcon}</View>
    //   <View style={styles.title}>
    //     <Text style={[styles.titleText, titleStyle]}>{title}</Text>
    //   </View>
    //   <View style={styles.rightIcon}>{rightIcon}</View>
    // </View>

    <View style={{...styles.customHeader, ...style}}>
      {leftIcon ? (
        <TouchableOpacity onPress={onLeftPress}>
          <Ionicons
            name="arrow-back-outline"
            color={color.text}
            size={32}
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>{props.route.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  customHeader: {
    height: size.scale(58),
    paddingHorizontal: spacing.tiny,
    backgroundColor: color.background,
    borderBottomWidth: 1,
    borderBottomColor: color.primaryDarker,
    shadowColor: color.primaryDarker,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
    flexDirection: 'row',
    paddingVertical: size.scale(10),
    alignItems: 'center',
  },
  icon: {
    marginTop: size.scale(4),
  },
  title: {
    fontSize: size.scale(24),
    color: color.text,
    marginHorizontal: size.scale(10),
  },
});

export default CustomHeader;
