import {StyleSheet} from 'react-native';

import {color, size, typography} from '../../theme';

export default StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: color.background,
  },
  WorkoutHeadingText: {
    fontSize: size.scale(18),
    color: color.text,
    fontFamily: typography.primaryBold,
    marginVertical: size.scale(10),
    marginHorizontal: size.scale(20),
  },
  contribCont: {
    flex: 1,
    backgroundColor: color.background,
    paddingBottom: size.scale(30),
    paddingTop: size.scale(20),
  },
});
