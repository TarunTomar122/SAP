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
});
