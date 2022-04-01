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
    fontSize: 50,
    color: color.text,
    fontFamily: typography.primaryBold,
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: size.scale(20),
    paddingBottom: size.scale(70),
    paddingHorizontal: size.scale(22),
    width: "100%",
  },
  card: {
    flex: 1,
    backgroundColor: color.background,
    width: "100%",
    justifyContent: 'center',
    marginBottom: size.scale(20),
    paddingHorizontal: size.scale(14),
    paddingVertical: size.scale(14),
    borderWidth: 0.1,
    borderRadius: size.scale(10),
    borderColor: color.darkGrey,
  },
  title: {
    fontSize: size.scale(20),
    fontFamily: typography.primaryBold,
    color: color.primary,
    marginBottom: size.scale(6),
  },
  description: {
    fontSize: size.scale(16),
    fontFamily: typography.primary,
    color: color.lightGrey,
  },
  icon: {
    color: color.background,
    fontSize: size.scale(30),
  },
  qaContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: color.primary,
    marginBottom: size.scale(20),
    padding: size.scale(14),
    borderRadius: size.scale(10),
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: color.background,
  },
  iconView: {
    marginHorizontal: size.scale(24),
  },
});
