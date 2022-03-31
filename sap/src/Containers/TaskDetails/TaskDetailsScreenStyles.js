import { StyleSheet } from 'react-native';

import { color, colorLight, size, typography } from '../../theme';

export default StyleSheet.create({
  lightHome: {
    flex: 1,
    backgroundColor: colorLight.background,
  },
  darkHome: {
    flex: 1,
    backgroundColor: color.background,
  },
  darkHeader: {
    backgroundColor: color.background,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: size.scale(100),
  },
  lightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colorLight.background,
    height: size.scale(100),
  },
  darkHeaderTitle: {
    color: color.lightGrey,
  },
  darkTitle: {
    color: colorLight.lightGrey,
    fontFamily: typography.primaryBold,
    fontSize: size.scale(24),
    marginVertical: size.scale(10),
    marginBottom: size.scale(20),
  },
  darkInput: {
    backgroundColor: color.background,
    color: color.lightGrey,
    borderColor: color.lightGrey,
    borderWidth: 1,
    borderRadius: size.scale(10),
    padding: size.scale(10),
    paddingHorizontal: size.scale(20),
    margin: size.scale(10),
    marginHorizontal: size.scale(30),
    fontFamily: typography.primary,
    fontSize: size.scale(20),
    width: size.scale(280),
  },
  container: {
    backgroundColor: color.background,
    padding: size.scale(10),
    alignItems: 'center',
  },
  textInput: {
    marginVertical: size.scale(20),
    borderBottomWidth: 1,
    borderColor: color.text,
    padding: size.scale(10),
    fontSize: size.scale(20),
    fontFamily: typography.primaryBold,
  },
  elevation: {
    elevation: 4,
    shadowColor: color.lightGrey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: size.scale(10),
    padding: size.scale(15),
  },
  // darkChartView: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: color.lightBackground,
  //   marginTop: size.scale(10),
  // },
});
