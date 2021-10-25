import {StyleSheet} from 'react-native';

import {color, size, typography} from '../../theme';

export default StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: color.background,
  },
  text: {
    fontSize: size.scale(20),
    color: color.text,
    fontFamily: typography.primaryBold,
  },
  task: {
    padding: size.scale(10),
    margin: size.scale(10),
    borderBottomWidth: 1,
    borderBottomColor: color.line,
  },
  taskTitle: {
    fontSize: size.scale(20),
    color: color.text,
    fontFamily: typography.primaryBold,
  },
  taskRemaining: {
    fontSize: size.scale(15),
    color: color.text,
    fontFamily: typography.primaryBold,
  },
});
