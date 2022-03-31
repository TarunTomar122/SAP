import { StyleSheet } from 'react-native';

import { color, colorLight, size, typography } from '../../theme';

export default StyleSheet.create({
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
    darkHomeContainer: {
        flex: 1,
        backgroundColor: color.background,
    },
    lightHomeContainer: {
        flex: 1,
        backgroundColor: colorLight.background,
    },
});
