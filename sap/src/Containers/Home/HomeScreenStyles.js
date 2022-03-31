import { StyleSheet } from 'react-native';

import { color, colorLight, size, typography } from '../../theme';

export default StyleSheet.create({
  darkHomeContainer: {
    flex: 1,
    backgroundColor: color.background,
  },
  lightHomeContainer: {
    flex: 1,
    backgroundColor: colorLight.background,
  },
  darkHeader: {
    backgroundColor: color.background,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  lightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colorLight.background,
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
