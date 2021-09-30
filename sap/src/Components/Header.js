import React from 'react';
import {Header} from '@react-navigation/native';
import {View, Platform, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomHeader = props => {
  return (
    <View style={styles.customHeader}>
      <LinearGradient colors={['#333b45', '#1d2025']} style={styles.custom}>
        {/* <Header {...props} /> */}
        <Text style={styles.title}>{props.route.name}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  customHeader: {
    height: Platform.OS === 'ios' ? 70 : 60,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#333b45',
    borderBottomWidth: 1,
    borderBottomColor: '#333b45',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  title: {
    fontSize: 28,
    color: 'white',
    paddingLeft: 20,
    paddingTop: 8,
    paddingBottom: 15,
  },
});

export default CustomHeader;
