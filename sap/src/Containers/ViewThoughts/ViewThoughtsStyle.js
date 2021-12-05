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
    paddingTop: size.scale(16),
  },
  noThought: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: size.scale(20),
    color: color.text,
    fontFamily: typography.primaryBold,
  },
  thought: {
    flex: 1,
    padding: size.scale(10),
    paddingTop: size.scale(16),
    paddingBottom: size.scale(10),
    borderBottomWidth: 1,
    borderBottomColor: color.lightGrey,
  },
  thoughtText: {
    fontSize: size.scale(18),
    color: color.text,
    fontFamily: typography.primary,
  },
  date: {
    fontSize: size.scale(14),
    color: color.lightGrey,
    fontFamily: typography.primary,
    marginTop: size.scale(10),
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: size.scale(10),
    marginTop: size.scale(10),
  },
});
