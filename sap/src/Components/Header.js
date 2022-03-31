import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { colorLight, color, size, spacing, typography } from '../theme';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomHeader = props => {
  const {
    leftIcon,
    onLeftPress,
    onRightPress,
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

    <View style={[{ ...styles.customHeader, ...style }, styles.elevation]}>
      {leftIcon == 'write' ? (
        <TouchableOpacity onPress={onLeftPress} style={leftIconStyle}>
          <FontAwesome5
            name="pen"
            color={color.lightGrey}
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : null}

      <Text style={[styles.titleStyle, titleStyle]}>{props.route.name}</Text>

      {rightIcon == 'calendar' && (
        <TouchableOpacity
          onPress={onRightPress}
          style={[rightIconStyle, styles.rightIconStyle]}>
          <FontAwesome5
            name="calendar-day"
            color={color.lightGrey}
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}

      {rightIcon == 'delete' && (
        <TouchableOpacity
          onPress={onRightPress}
          style={[rightIconStyle, styles.rightIconStyle]}>
          <AntDesign
            name="delete"
            color={color.lightGrey}
            size={32}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}

      {rightIcon == 'view' && (
        <TouchableOpacity
          onPress={onRightPress}
          style={[rightIconStyle, styles.rightIconStyle]}>
          <MaterialIcons
            name="show-chart"
            color={color.lightGrey}
            size={32}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      {rightIcon == 'swap' && (
        <TouchableOpacity
          onPress={onRightPress}
          style={[rightIconStyle, styles.rightIconStyle]}>
          <MaterialIcons
            name="swap-horiz"
            color={color.lightGrey}
            size={32}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      {
        rightIcon == 'bookmark' && (
          <TouchableOpacity
            onPress={onRightPress}
            style={[rightIconStyle, styles.rightIconStyle]}>
            <MaterialIcons
              name="bookmark-outline"
              color={color.lightGrey}
              size={32}
              style={styles.icon}
            />
          </TouchableOpacity>
        )
      }
      {
        rightIcon == "bookmarked" && (
          <TouchableOpacity
            onPress={onRightPress}
            style={[rightIconStyle, styles.rightIconStyle]}>
            <MaterialIcons
              name="bookmark"
              color={color.lightGrey}
              size={32}
              style={styles.icon}
            />
          </TouchableOpacity>
        )
      }
      {
        rightIcon == 'add' && (
          <TouchableOpacity
            onPress={onRightPress}
            style={[rightIconStyle, styles.rightIconStyle]}>
            <MaterialIcons
              name="add"
              color={color.lightGrey}
              size={32}
              style={styles.icon}
            />
          </TouchableOpacity>
        )
      }
      {
        rightIcon == 'profile' && (
          <TouchableOpacity
            onPress={onRightPress}
            style={[rightIconStyle, styles.rightIconStyle]}>
            <MaterialCommunityIcons
              name="guitar-pick"
              color={color.lightGrey}
              size={28}
              style={styles.icon}
            />
          </TouchableOpacity>
        )
      }
      {
        rightIcon == 'run' && (
          <TouchableOpacity
            onPress={onRightPress}
            style={[rightIconStyle, styles.rightIconStyle]}>
            <MaterialCommunityIcons
              name="run"
              color={color.lightGrey}
              size={28}
              style={styles.icon}
            />
          </TouchableOpacity>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  customHeader: {
    height: size.scale(76),
    paddingHorizontal: spacing.tiny,
    // borderBottomWidth: 1,
    // borderBottomColor: color.primary,
    // shadowColor: color.primary,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // elevation: 5,
    // flexDirection: 'row',
    // paddingVertical: size.scale(10),
    // alignItems: 'center',
  },
  icon: {
    marginTop: size.scale(4),
  },
  titleStyle: {
    fontSize: size.scale(24),
    marginHorizontal: size.scale(10),
    fontFamily: typography.primaryBold,
    color: color.lightGrey,
  },
  // elevation: {
  //   elevation: 10,
  //   shadowColor: color.lightGrey,
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   // borderRadius: size.scale(10),
  //   padding: size.scale(15),
  // },
});

export default CustomHeader;
