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
    paddingTop: size.scale(30),
  },
  autocomplete: {
    borderRadius: size.scale(15),
    borderColor: color.primary,
    padding: size.scale(10),
    fontSize: size.scale(20),
    fontFamily: typography.primaryBold,
    color: color.lightGrey,
  },
  autocompleteContainer: {
    // flex: 1,
    // left: 20,
    // position: 'absolute',
    // right: 20,
    // top: 30,
    // zIndex: 1,
    // borderColor: color.primary,

    paddingBottom: size.scale(100),
    // borderWidth: size.scale(1),
    // borderColor: color.primary,
  },
  suggestionBox: {
    backgroundColor: color.background,
    borderColor: color.primary,
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
    borderColor: color.lightGrey,
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
  buttonContainer: {
    marginVertical: size.scale(20),
    padding: size.scale(10),
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
    width: '40%',
  },
  selectedTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: size.scale(20),
  },
  selectedTagListItemContainer: {
    flexDirection: 'row',
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: size.scale(8),
    padding: size.scale(10),
    marginRight: size.scale(10),
  },
  selectedTagText: {
    fontSize: size.scale(16),
    fontFamily: typography.primaryBold,
    color: color.text,
    marginHorizontal: size.scale(5),
  },
  removeTagText: {
    fontSize: size.scale(16),
    fontFamily: typography.primaryBold,
    color: color.primary,
    marginHorizontal: size.scale(5),
  },
});
