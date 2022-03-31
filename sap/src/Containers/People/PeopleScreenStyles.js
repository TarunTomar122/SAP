import { StyleSheet } from 'react-native';

import { colorLight, color, size, typography } from '../../theme';

export default StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  lightHome: {
    flex: 1,
    backgroundColor: colorLight.background,
  },
  darkHome: {
    flex: 1,
    backgroundColor: color.background,
  },
  lightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  darkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  darkText: {
    color: colorLight.lightGrey,
  },
  lightText: {
    color: colorLight.text,
  },
  elevation: {
    elevation: 2,
    shadowColor: colorLight.lightGrey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: size.scale(10),
    padding: size.scale(15),
  },
  darkRecentEntriesContainer: {
    marginVertical: size.scale(20),
    marginHorizontal: size.scale(20),
  },
  darkTitle: {
    fontSize: size.scale(20),
    fontFamily: typography.primaryBold,
    color: color.lightGrey,
    marginVertical: size.scale(10),
    borderBottomWidth: 1,
    borderBottomColor: color.primary,
    paddingVertical: size.scale(10),
  },
  darkListCardContainer: {
    marginVertical: size.scale(10),
    overflow: 'hidden',
    borderLeftWidth: size.scale(5),
    borderLeftColor: color.primary,
    paddingHorizontal: size.scale(14),
    marginHorizontal: size.scale(10),
  },
  darkListCardDate: {
    fontSize: size.scale(12),
    fontFamily: typography.primaryBold,
    color: color.darkGrey,
  },
  darkListCardTitle: {
    fontSize: size.scale(18),
    fontFamily: typography.primaryBold,
    color: color.primary,
    marginTop: size.scale(5),
  },
  darkBottomContainer: {
    marginHorizontal: size.scale(14),
    marginVertical: size.scale(20),
  },
  darkQuote: {
    fontSize: size.scale(18),
    fontFamily: typography.primaryBold,
    color: color.lightGrey,
    marginHorizontal: size.scale(10),
    marginVertical: size.scale(10),
  }
});
