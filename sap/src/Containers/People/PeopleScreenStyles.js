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
  listBox: {
    margin: size.scale(10),
    borderRightWidth: 0.6,
    borderColor: color.lightGrey,
    padding: size.scale(10),
  },
  listView: {
    marginBottom: size.scale(60),
  },
  personName: {
    fontSize: size.scale(22),
    color: color.text,
    fontFamily: typography.primaryBoldItalic,
  },
  tagView: {
    flexDirection: 'row',
    marginTop: size.scale(10),
  },
  tag: {
    fontSize: size.scale(14),
    color: color.lightGrey,
    fontFamily: typography.primary,
    marginHorizontal: size.scale(5),
  },
  tagListView: {
    flexDirection: 'row',
  },
});
