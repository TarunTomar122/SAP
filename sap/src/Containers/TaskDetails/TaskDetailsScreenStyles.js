import {StyleSheet} from 'react-native';

import {color, size, typography} from '../../theme';

export default StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: color.background,
  },
  container: {
    flex: 1,
    backgroundColor: color.background,
    padding: size.scale(10),
  },
  textInput: {
    marginVertical: size.scale(20),
    borderBottomWidth: 1,
    borderColor: color.text,
    padding: size.scale(10),
    fontSize: size.scale(20),
    fontFamily: typography.primaryBold,
  },
  buttonContainer: {
    marginVertical: size.scale(20),
    padding: size.scale(10),
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
    width: '40%',
    marginBottom: size.scale(30),
  },
  entriesContainer: {
    padding: size.scale(10),
    paddingBottom: size.scale(100),
  },
  entriesText: {
    fontSize: size.scale(20),
    color: color.text,
    marginBottom: size.scale(10),
    fontFamily: typography.primaryBold,
  },
  entries: {
    paddingVertical: size.scale(10),
    marginBottom: size.scale(200),
    minHeight: size.scale(100),
  },
  entryContainer: {
    marginVertical: size.scale(10),
    padding: size.scale(10),
    borderWidth: 1,
    // borderColor: color.palette.white,
    borderRadius: size.scale(10),
    opacity: 0.8,
  },
  entryText: {
    fontSize: size.scale(20),
    color: color.text,
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
});
