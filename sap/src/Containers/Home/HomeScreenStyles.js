import { StyleSheet } from 'react-native';

import { color, size, typography } from '../../theme';

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
  mainProgressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: size.scale(20),
  },
  secondaryProgressContainer: {
    marginTop: size.scale(20),
    marginBottom: size.scale(80),
  },
  progressHeading: {
    fontSize: size.scale(20),
    color: color.text,
    fontFamily: typography.primary,
    marginBottom: size.scale(16),
  },
  indvProgressContainer: {
    marginBottom: size.scale(16),
  }
});
