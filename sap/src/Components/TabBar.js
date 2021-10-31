import React from 'react';

import {View, Pressable, Dimensions, StyleSheet} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {color, size} from '../theme';

const {width} = Dimensions.get('window');

const TabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View
            key={index}
            style={[
              styles.mainItemContainer,
              {borderRightWidth: label == 'notes' ? 3 : 0},
            ]}>
            <Pressable
              onPress={onPress}
              style={{
                // backgroundColor: isFocused ? '#d6bfa9' : '#222a2d',
                // borderRadius: 20,
                borderBottomColor: 'white',
                borderBottomWidth: isFocused ? 1 : 0,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  padding: 10,
                }}>
                {label == 'home' ? (
                  isFocused ? (
                    <Ionicons name="home" color={color.text} size={37} />
                  ) : (
                    <Ionicons
                      name="home-outline"
                      color={color.text}
                      size={37}
                    />
                  )
                ) : label == 'todo' ? (
                  isFocused ? (
                    <FontAwesome5 name="pen" color={color.text} size={34} />
                  ) : (
                    <SimpleLineIcons
                      name="pencil"
                      color={color.text}
                      size={34}
                    />
                  )
                ) : label == 'journal' ? (
                  isFocused ? (
                    <AntDesign name="pluscircle" color={color.text} size={48} />
                  ) : (
                    <AntDesign
                      name="pluscircleo"
                      color={color.text}
                      size={48}
                    />
                  )
                ) : label == 'track' ? (
                  isFocused ? (
                    <Ionicons name="stopwatch" color={color.text} size={49} />
                  ) : isFocused ? (
                    <Ionicons
                      name="stopwatch-outline"
                      color={color.text}
                      size={52}
                    />
                  ) : (
                    <Ionicons
                      name="stopwatch-outline"
                      color={color.text}
                      size={50}
                    />
                  )
                ) : isFocused ? (
                  <Ionicons name="people" color={color.text} size={42} />
                ) : (
                  <Ionicons
                    name="ios-people-outline"
                    color={color.text}
                    size={42}
                  />
                )}
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: color.icons,
    marginHorizontal: 0,
    paddingVertical: size.scale(2),
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
    borderColor: color.text,
  },
});

export default TabBar;