import {StyleSheet} from 'react-native';

import {color, size, typography} from '../../theme';

export default StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: color.background,
  },
  filters: {
    flex: 1,
    paddingHorizontal: size.scale(30),
    paddingBottom: size.scale(40),
  },
  chartView: {
    flex: 1,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: size.scale(30),
    backgroundColor: color.background,
    height: size.scale(40),
    zIndex: -1,
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
    zIndex: 100,
    backgroundColor: color.background,
    borderRadius: size.scale(10),
    borderWidth: size.scale(1),
    marginTop: size.scale(20),
  },
});
