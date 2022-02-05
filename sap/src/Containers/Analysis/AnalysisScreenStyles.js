import { StyleSheet } from 'react-native';

import { color, size, typography } from '../../theme';

export default StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: color.background,
  },
  header: {
    width: '100%',
  },
  contribCont: {
    padding: size.scale(10),
    paddingTop: size.scale(40)
  },
  WorkoutHeadingText: {
    fontSize: size.scale(24),
    color: color.text,
    fontFamily: typography.primaryBold,
    marginHorizontal: size.scale(10),
    marginBottom: size.scale(10),
    // alignSelf: 'center'
  },
  text: {
    fontSize: size.scale(50),
    color: color.text,
    fontFamily: typography.primaryBold,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: size.scale(30),
    backgroundColor: color.background,
    height: size.scale(50),
  },
  pickerText: {
    fontSize: size.scale(22),
    color: color.text,
    fontFamily: typography.primaryBold,
  },
  elevation: {
    elevation: size.scale(6),
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: size.scale(10),
  },
  pickerDropDown: {
    backgroundColor: color.background,
    borderRadius: size.scale(10),
    borderWidth: size.scale(1),
    marginTop: size.scale(20),
  },
  button: {
    borderRadius: size.scale(5),
    borderBottomWidth: size.scale(1),
    borderColor: color.primary,
    paddingVertical: size.scale(16),
    paddingHorizontal: size.scale(10),
  },
  buttonText: {
    fontSize: size.scale(24),
    color: color.text,
    fontFamily: typography.primaryBold,
  }
});
