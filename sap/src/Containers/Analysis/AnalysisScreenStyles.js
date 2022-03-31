import { StyleSheet } from 'react-native';

import { color, colorLight, size, typography } from '../../theme';

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
    height: size.scale(120),
  },
  lightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colorLight.background,
    height: size.scale(100),
  },
  darkHeaderTitle: {
    color: color.lightGrey,
  },
  darkTitle: {
    color: colorLight.lightGrey,
    fontFamily: typography.primaryBold,
    fontSize: size.scale(24),
    marginVertical: size.scale(10),
    marginBottom: size.scale(20),
  },
  darkChartView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.background,
  }
});
