import React from 'react';

import {View, Pressable, Dimensions, StyleSheet} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

// import {SelectWheel} from '.';

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
                borderRadius: 20,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  padding: 10,
                }}>
                {label == 'home' ? (
                  // {isFocused ? (  <Feather name="home" color="#ecc9a7" size={34} />):}
                  isFocused ? (
                    <Ionicons name="home" color="white" size={42} />
                  ) : (
                    <Ionicons name="home-outline" color="#ecc9a7" size={38} />
                  )
                ) : // <Feather name="home" color="#ecc9a7" size={34} />
                label == 'todo' ? (
                  isFocused ? (
                    <FontAwesome5 name="pen" color="white" size={38} />
                  ) : (
                    <SimpleLineIcons name="pencil" color="#ecc9a7" size={35} />
                  )
                ) : label == 'JournalScreen' ? (
                  isFocused ? (
                    <AntDesign name="pluscircle" color="white" size={52} />
                  ) : (
                    <AntDesign name="pluscircleo" color="#ecc9a7" size={48} />
                  )
                ) : label == 'track' ? (
                  isFocused ? (
                    <Ionicons name="stopwatch-sharp" color="white" size={50} />
                  ) : isFocused ? (
                    <Ionicons
                      name="stopwatch-outline"
                      color="#ecc9a7"
                      size={52}
                    />
                  ) : (
                    <Ionicons
                      name="stopwatch-outline"
                      color="#ecc9a7"
                      size={50}
                    />
                  )
                ) : isFocused ? (
                  <Ionicons name="people" color="white" size={46} />
                ) : (
                  <Ionicons
                    name="ios-people-outline"
                    color="#ecc9a7"
                    size={40}
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
    backgroundColor: '#333b45',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginHorizontal: 0,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    borderColor: '#333B42',
  },
});

export default TabBar;
