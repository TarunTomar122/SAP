import {StyleSheet} from 'react-native';

import {color, size, typography} from '../../theme';

export default StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: color.background,
  },
  container: {
    flex: 1,
    padding: size.scale(20),
  },
  text: {
    fontSize: size.scale(20),
    color: color.text,
    fontFamily: typography.primary,
  },
  cardStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size.scale(20),
  }
});
