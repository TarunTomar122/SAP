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
    // paddingTop: size.scale(30),
  },
  textBox: {
    borderWidth: 0.5,
    borderColor: color.lightGrey,
    borderRadius: size.scale(5),
    padding: size.scale(10),
    marginBottom: size.scale(10),
    fontSize: size.scale(16),
    fontFamily: typography.primaryBold,
    color: color.text,
  },
  titleBox: {
    marginBottom: size.scale(30),
    marginTop: size.scale(10),
    borderBottomWidth: 1,
    borderColor: color.lightGrey,
    padding: size.scale(10),
    fontSize: size.scale(20),
    fontFamily: typography.primaryBold,
    color: color.text,
  },
  ratingBox: {
    marginVertical: size.scale(20),
    borderBottomWidth: 1,
    borderColor: color.lightGrey,
    padding: size.scale(10),
    fontSize: size.scale(20),
    fontFamily: typography.primaryBold,
    color: color.text,
  },
  buttonContainer: {
    marginVertical: size.scale(20),
    padding: size.scale(10),
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '40%',
  },
});
