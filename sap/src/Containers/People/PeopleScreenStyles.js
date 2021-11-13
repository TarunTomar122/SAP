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
});
