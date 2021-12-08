import {StyleSheet} from 'react-native';

import {color, size, typography} from '../../theme';

export default StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: color.background,
  },
  searchBar: {
    margin: size.scale(10),
    borderBottomWidth: 1,
    borderColor: color.lightGrey,
  },
  textInput: {
    fontSize: size.scale(16),
    color: color.primaryDarker,
    fontFamily: typography.primary,
  },
  text: {
    fontSize: size.scale(20),
    color: color.text,
    fontFamily: typography.primaryBold,
  },
  task: {
    padding: size.scale(10),
    marginHorizontal: size.scale(10),
    marginVertical: size.scale(6),
    // borderBottomWidth: 1,
    borderBottomColor: color.separator,
  },
  elevation: {
    elevation: 4,
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: size.scale(10),
    padding: size.scale(15),
  },
  listView: {
    marginBottom: size.scale(60),
  },
  taskTitle: {
    fontSize: size.scale(20),
    color: color.text,
    fontFamily: typography.primaryBold,
    marginBottom: size.scale(5),
  },
  taskRemaining: {
    fontSize: size.scale(15),
    color: color.text,
    fontFamily: typography.primaryBold,
  },
  noEntryText: {
    fontSize: size.scale(20),
    color: color.text,
    fontFamily: typography.primaryBold,
    textAlign: 'center',
    marginTop: size.scale(20),
  },
});
