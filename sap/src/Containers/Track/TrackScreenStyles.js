import { StyleSheet } from 'react-native';

import { colorLight, color, size, typography } from '../../theme';

export default StyleSheet.create({
  darkText: {
    color: color.lightGrey,
  },
  lightText: {
    color: colorLight.lightGrey,
  },
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
  },
  lightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colorLight.background,
  },
  text: {
    fontSize: size.scale(20),
    color: colorLight.icons,
    fontFamily: typography.primaryBold,
  },
  lightTaskContainer: {
    backgroundColor: colorLight.icons,
    padding: size.scale(10),
    marginHorizontal: size.scale(10),
    marginVertical: size.scale(6),
    borderBottomColor: color.separator,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  darkTaskContainer: {
    padding: size.scale(10),
    marginHorizontal: size.scale(10),
    marginVertical: size.scale(6),
    // borderBottomWidth: 1,
    borderBottomColor: color.separator,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  listView: {
    marginBottom: size.scale(60),
    marginTop: size.scale(10),
    marginHorizontal: size.scale(10),
  },
  darkTitle: {
    fontSize: size.scale(20),
    color: color.primary,
    fontFamily: typography.primaryBold,
    marginBottom: size.scale(5),
  },
  lightTitle: {
    fontSize: size.scale(20),
    color: color.darkGrey,
    fontFamily: typography.primaryBold,
    marginBottom: size.scale(5),
  },
  darkTaskRemainderText: {
    fontSize: size.scale(15),
    color: color.darkGrey,
    fontFamily: typography.primaryBold,
  },
  lightTaskRemainderText: {
    fontSize: size.scale(15),
    color: color.darkGrey,
    fontFamily: typography.primaryBold,
  },
  noEntryText: {
    fontSize: size.scale(20),
    color: colorLight.darkGrey,
    fontFamily: typography.primaryBold,
    textAlign: 'center',
    marginTop: size.scale(20),
  },
  icon: {
    fontSize: size.scale(36),
    color: color.primary,
  }
});
