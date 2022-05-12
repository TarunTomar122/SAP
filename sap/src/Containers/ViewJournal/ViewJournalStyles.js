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
  lightHeader: {
    alignItems: 'center',
  },
  darkHeader: {
    // alignItems: 'center',
    paddingHorizontal: size.scale(20),
    justifyContent: 'center',
    marginTop: size.scale(80),
  },
  darkHeaderText: {
    fontSize: size.scale(20),
    fontFamily: typography.primaryBold,
    color: color.primary,
    marginTop: size.scale(36),
    marginBottom: size.scale(4),
  },
  darkHeaderDate: {
    fontSize: size.scale(14),
    fontFamily: typography.primaryBold,
    color: color.darkGrey,
    marginVertical: size.scale(4),
  },
  darkContentContainer: {
    marginVertical: size.scale(20),
    marginHorizontal: size.scale(20),
  },
  darkContentText: {
    fontSize: size.scale(20),
    fontFamily: typography.primary,
    color: color.lightGrey,
  },
  darkTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  darkTagsText: {
    fontSize: size.scale(26),
    fontFamily: typography.primary,
    color: color.lightGrey,
    marginHorizontal: size.scale(10),
  },

});
