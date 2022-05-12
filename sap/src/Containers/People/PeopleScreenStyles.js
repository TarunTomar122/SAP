import { StyleSheet } from 'react-native';

import { colorLight, color, size, typography } from '../../theme';

export default StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  lightHome: {
    flex: 1,
    backgroundColor: colorLight.background,
  },
  darkHome: {
    flex: 1,
    backgroundColor: color.background,
  },
  lightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  darkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  darkText: {
    color: colorLight.lightGrey,
  },
  lightText: {
    color: colorLight.text,
  },
  elevation: {
    elevation: 2,
    shadowColor: colorLight.lightGrey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: size.scale(10),
    padding: size.scale(15),
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#00000040',
  },
  modalView: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderTopRightRadius: size.scale(20),
    borderTopLeftRadius: size.scale(20),
    marginTop: size.scale(60),
    padding: size.scale(15),
    // alignItems: "center",
    shadowColor: color.primary,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5
  },
  darkFactContainer: {
    justifyContent: "center",
    marginBottom: size.scale(20),
    padding: size.scale(30),
  },
  darkFactTitle:{
    fontSize: size.scale(22),
    fontFamily: typography.primaryBold,
    color: color.primary,
    marginBottom: size.scale(10),
  },
  darkFactText:{
    fontSize: size.scale(18),
    fontFamily: typography.primary,
    color: color.lightGrey,
    marginBottom: size.scale(20),
  }

});
