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
        paddingTop: size.scale(40),
    },
    text: {
        fontSize: size.scale(20),
        color: color.text,
        fontFamily: typography.primary,
    },
    cardStyle: {
        backgroundColor: color.background,
        marginBottom: size.scale(20),
        padding: size.scale(10),
        paddingBottom: size.scale(15),
        borderBottomWidth: size.scale(0.2),
        borderBottomColor: color.text,
    }
});
