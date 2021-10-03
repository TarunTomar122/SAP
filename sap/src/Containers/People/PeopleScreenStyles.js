import {StyleSheet} from 'react-native';

import {color, size} from '../../theme';

export default StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.background,
  },
  text: {
    fontSize: 50,
    color: color.text,
  },
});
