import {StyleSheet} from 'react-native';

import {color, size, typography} from '../../theme';

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
  autocomplete: {
    borderRadius: size.scale(15),
    padding: size.scale(10),
    fontSize: size.scale(20),
    fontFamily: typography.primaryBold,
    color: color.lightGrey,
  },
  autocompleteContainer: {
    flex: 1,
    left: 20,
    position: 'absolute',
    right: 20,
    top: 30,
    zIndex: 1,
  },
  suggestionBox: {
    backgroundColor: color.background,
    width: '100%',
    padding: size.scale(10),
  },
  suggestionText: {
    fontSize: size.scale(20),
    fontFamily: typography.primaryBold,
    color: color.lightGrey,
  },
  textInput: {
    marginVertical: size.scale(20),
    borderBottomWidth: 1,
    borderColor: color.text,
    padding: size.scale(10),
    fontSize: size.scale(20),
    fontFamily: typography.primaryBold,
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
    fontFamily: typography.primaryBold,
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
    borderColor: color.primary,
    padding: size.scale(10),
    alignItems: 'center',
    width: '50%',
  },
  buttonText: {
    fontSize: size.scale(20),
    color: color.primary,
    fontFamily: typography.primaryBold,
  },
});
