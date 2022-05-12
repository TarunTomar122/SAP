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
  },
  listView: {
    marginBottom: size.scale(60),
    marginTop: size.scale(10),
    marginHorizontal: size.scale(10),
  },
  darkGoalContainer: {
    padding: size.scale(12),
    paddingVertical: size.scale(16),
    marginHorizontal: size.scale(10),
    marginVertical: size.scale(6),
    borderLeftWidth: 0.5,
    borderColor: color.separator,
  },
  darkGoalTitle: {
    fontSize: size.scale(20),
    color: color.text,
    fontFamily: typography.primary,
    marginTop: size.scale(6),
    marginBottom: size.scale(12),
  },
  elevation: {
    elevation: 4,
    shadowColor: color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: size.scale(10),
    padding: size.scale(15),
  },

});
