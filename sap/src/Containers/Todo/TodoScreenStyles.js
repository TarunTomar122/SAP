import { StyleSheet } from 'react-native';

import { color, size, typography } from '../../theme';

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
    fontFamily: typography.primaryBold,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: size.scale(20),
  },
  modalView: {
    // margin: 20,
    width: "90%",
    backgroundColor: color.text,
    borderRadius: size.scale(10),
    padding: size.scale(15),
    alignItems: "center",
    shadowColor: color.primaryDarker,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: size.scale(5),
    padding: size.scale(10),
    backgroundColor: color.text,
    borderWidth: size.scale(1),
    borderColor: color.primary,
    elevation: 2
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
    paddingHorizontal: size.scale(10),
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
    borderRadius: size.scale(10),
    borderBottomWidth: 0.2,
    borderColor: color.lightGrey,
  },
  title: {
    fontSize: size.scale(20),
    fontFamily: typography.primaryBold,
    color: color.text,
    marginBottom: size.scale(6),
  },
  description: {
    fontSize: size.scale(16),
    fontFamily: typography.primary,
    color: color.lightGrey,
  },
  icon: {
    color: color.text,
    fontSize: size.scale(30),
  },
  qaContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: color.primary,
    marginBottom: size.scale(20),
    padding: size.scale(10),
    borderRadius: size.scale(10),
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: color.background,
  },
  iconView: {
    marginHorizontal: size.scale(24),
  }
});
