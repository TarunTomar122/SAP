import React from 'react';

import { View, Pressable, Dimensions, StyleSheet } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import { colorLight, color, size } from '../theme';

const { width } = Dimensions.get('window');

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
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
              { borderRightWidth: label == 'notes' ? 3 : 0 },
            ]}>
            <Pressable
              onPress={onPress}
              style={{
                // backgroundColor: isFocused ? '#d6bfa9' : '#222a2d',
                // borderRadius: 20,
                borderBottomColor: isFocused ? color.primary : color.lightGrey,
                borderBottomWidth: isFocused ? 1 : 0,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  padding: 4,
                }}>
                {label == 'home' ? (
                  isFocused ? (
                    <AntDesign name="home" color={color.darkGrey} size={32} />
                  ) : (
                    <AntDesign name="home" color={color.lightGrey} size={32} />
                  )
                ) : label == 'todo' ? (
                  isFocused ? (
                    <SimpleLineIcons name="pencil" color={color.darkGrey} size={28} />
                  ) : (
                    <SimpleLineIcons name="pencil" color={color.lightGrey} size={28} />
                  )
                ) : label == 'read' ? (
                  isFocused ? (
                    <MaterialIcons name="article" color={color.darkGrey} size={30} />
                  ) : (
                    <MaterialIcons name="article" color={color.lightGrey} size={30} />
                  )
                ) : label == 'track' ? (
                  isFocused ? (
                    <Ionicons
                      name="stopwatch-outline"
                      color={color.darkGrey}
                      size={34}
                    />
                  ) : (
                    <Ionicons
                      name="stopwatch-outline"
                      color={color.lightGrey}
                      size={36}
                    />
                  )
                ) : isFocused ? (
                  <Ionicons
                    name="ios-people-outline"
                    color={color.darkGrey}
                    size={33}
                  />
                ) : (
                  <Ionicons
                    name="ios-people-outline"
                    color={color.lightGrey}
                    size={35}
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
    backgroundColor: colorLight.description,
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
