import {StyleSheet} from 'react-native';

import {color, size} from '../../theme';

export default StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: color.background,
  },
  container: {
    flex: 1,
    backgroundColor: color.background,
    padding: size.scale(10),
  },
  inputContainer: {
    // borderWidth: 1,
    // borderColor: 'white',
  },
  textInput: {
    marginVertical: size.scale(20),
    borderBottomWidth: 1,
    borderColor: color.text,
    padding: size.scale(10),
    paddingRight: size.scale(56),
    fontSize: size.scale(20),
  },
  dot: {
    position: 'absolute',
    right: size.scale(10),
    top: '35%',
  },
  colorPicker: {
    height: size.scale(26),
    width: size.scale(26),
    borderRadius: size.scale(30),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: size.scale(30),
  },
  modalView: {
    margin: 20,
    backgroundColor: color.dim,
    borderRadius: size.scale(10),
    paddingHorizontal: size.scale(10),
    paddingVertical: size.scale(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: size.scale(20),
    textAlign: 'center',
    fontSize: size.scale(20),
  },
  colorPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: size.scale(16),
  },
  colorPickerItem: {
    height: size.scale(32),
    width: size.scale(32),
    borderRadius: size.scale(30),
    marginHorizontal: size.scale(8),
  },
  buttonContainer: {
    marginVertical: size.scale(20),
    padding: size.scale(10),
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderRadius: size.scale(10),
    borderColor: color.palette.reddish,
    padding: size.scale(10),
    alignItems: 'center',
    width: '50%',
  },
  buttonText: {
    fontSize: size.scale(20),
    color: color.palette.reddish,
  },
});
