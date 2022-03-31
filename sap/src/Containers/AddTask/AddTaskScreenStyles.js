import { StyleSheet } from 'react-native';

import { colorLight, color, size, typography } from '../../theme';

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
  darkTitle: {
    color: color.lightGrey,
  },
  lightTitle: {
    color: colorLight.lightGrey,
  },
  darkTextInput: {
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
  lightTextInput: {
    backgroundColor: colorLight.background,
    color: colorLight.lightGrey,
    borderColor: colorLight.lightGrey,
    borderWidth: 1,
    borderRadius: size.scale(10),
    padding: size.scale(10),
    margin: size.scale(10),
    width: size.scale(280),
  },
  elevation: {
    elevation: 4,
    shadowColor: color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: size.scale(10),
    padding: size.scale(15),
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  darkSuggestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: color.background,
    width: size.scale(280),
    marginVertical: size.scale(20),
  },
  darkSuggestion: {
    backgroundColor: color.background,
    borderColor: color.darkGrey,
    borderBottomWidth: 1,
    paddingVertical: size.scale(10),
    marginRight: size.scale(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkSuggestionText: {
    color: color.lightGrey,
    fontFamily: typography.primary,
    fontSize: size.scale(20),
  },
  darkSText: {
    color: color.lightGrey,
    fontFamily: typography.primary,
    fontSize: size.scale(20),
    marginTop: size.scale(18),
  },
  darkButtonText: {
    color: color.primary,
    fontFamily: typography.primary,
    fontSize: size.scale(20),
  }

  // autocomplete: {
  //   borderRadius: size.scale(15),
  //   borderColor: color.primary,
  //   padding: size.scale(10),
  //   fontSize: size.scale(20),
  //   fontFamily: typography.primaryBold,
  //   color: color.lightGrey,
  // },
  // autocompleteContainer: {
  //   flex: 1,
  //   left: 20,
  //   position: 'absolute',
  //   right: 20,
  //   top: 30,
  //   zIndex: 1,
  //   borderColor: color.primary,
  // },
  // suggestionBox: {
  //   backgroundColor: color.background,
  //   borderColor: color.primary,
  //   width: '100%',
  //   padding: size.scale(10),
  // },
  // suggestionText: {
  //   fontSize: size.scale(20),
  //   fontFamily: typography.primaryBold,
  //   color: color.lightGrey,
  // },
  // textInput: {
  //   marginVertical: size.scale(20),
  //   borderBottomWidth: 1,
  //   borderColor: color.lightGrey,
  //   padding: size.scale(10),
  //   fontSize: size.scale(20),
  //   fontFamily: typography.primaryBold,
  // },
  // dot: {
  //   position: 'absolute',
  //   right: size.scale(10),
  //   top: '35%',
  // },
  // colorPicker: {
  //   height: size.scale(26),
  //   width: size.scale(26),
  //   borderRadius: size.scale(30),
  // },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: size.scale(30),
  // },
  // buttonContainer: {
  //   marginVertical: size.scale(20),
  //   padding: size.scale(10),
  //   alignItems: 'center',
  // },
  // button: {
  //   alignSelf: 'center',
  //   width: '40%',
  // },
  // buttonText: {
  //   fontSize: size.scale(20),
  //   color: color.text,
  //   fontFamily: typography.primaryBold,
  // },
});
