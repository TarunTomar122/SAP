import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {color, size, spacing} from '../theme';

const CustomHeader = props => {
  const {
    leftIcon,
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

    <View style={styles.customHeader}>
      <Text style={styles.title}>{props.route.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  customHeader: {
    height: size.scale(54),
    paddingHorizontal: spacing.tiny,
    backgroundColor: color.background,
    borderBottomWidth: 1,
    borderBottomColor: color.primaryDarker,
    shadowColor: color.primaryDarker,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
    position: 'relative',
  },
  title: {
    fontSize: size.scale(24),
    color: color.text,
    margin: spacing.smaller,
    position: 'absolute',
    left: spacing.tiny,
    top: spacing.tiny,
  },
});

export default CustomHeader;
