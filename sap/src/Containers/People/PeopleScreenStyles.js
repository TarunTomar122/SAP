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
    marginHorizontal: size.scale(12),
    marginVertical: size.scale(10),
    marginBottom: size.scale(20),
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#00000040',
  },
  modalView: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderTopRightRadius: size.scale(20),
    borderTopLeftRadius: size.scale(20),
    marginTop: size.scale(60),
    padding: size.scale(15),
    // alignItems: "center",
    shadowColor: color.primary,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5
  },
  button: {
    borderRadius: size.scale(5),
    padding: size.scale(16),
    backgroundColor: color.text,
    borderWidth: size.scale(1),
    borderColor: color.primary,
    elevation: 2,
    marginTop: size.scale(10),
    borderRadius: size.scale(12),
    marginBottom: size.scale(36),
  },
  darkModalTitle: {
    fontSize: size.scale(24),
    marginBottom: size.scale(20),
    marginTop: size.scale(30),
    textAlign: 'center',
    fontFamily: typography.primaryBold,
    color: color.primary
  },
  textStyle: {
    fontSize: size.scale(16),
    color: color.primary,
    fontFamily: typography.primaryBold,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  textInput: {
    width: "100%",
    marginVertical: size.scale(20),
    borderBottomWidth: 1,
    borderColor: color.lightGrey,
    padding: size.scale(10),
    fontSize: size.scale(18),
    fontFamily: typography.primaryBold,
  },
  darkIconContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: size.scale(16),
    marginBottom: size.scale(24),
  },
  darkSuggestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: color.background,
    width: size.scale(280),
    marginVertical: size.scale(20),
  },
  darkSuggestion: {
    backgroundColor: color.background,
    borderColor: color.darkGrey,
    borderBottomWidth: 1,
    paddingVertical: size.scale(10),
    marginRight: size.scale(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkSuggestionText: {
    color: color.lightGrey,
    fontFamily: typography.primary,
    fontSize: size.scale(20),
  },
  darkSText: {
    color: color.lightGrey,
    fontFamily: typography.primary,
    fontSize: size.scale(20),
    marginTop: size.scale(18),
  },
});
