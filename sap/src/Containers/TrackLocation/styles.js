import { StyleSheet } from 'react-native';

import { color, size, typography } from '../../theme';

export default StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: color.background,
  },
  container: {
    flex: 1,
    padding: size.scale(20),
  },
  text: {
    fontSize: size.scale(20),
    color: color.text,
    fontFamily: typography.primary,
  },
  mapView: {
    flex: 1,
  },
  title: {
    fontSize: size.scale(20),
    color: color.text,
    fontFamily: typography.primary,
    marginBottom: size.scale(20),
    marginTop: size.scale(20),
    marginLeft: size.scale(20),
  },
  subtitle: {
    fontSize: size.scale(16),
    color: color.text,
    fontFamily: typography.primary,
    marginBottom: size.scale(20),
    marginLeft: size.scale(20),
  },
});
