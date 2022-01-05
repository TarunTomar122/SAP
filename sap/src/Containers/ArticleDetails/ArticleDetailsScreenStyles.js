import { StyleSheet } from 'react-native';

import { color, size, typography } from '../../theme';

export default StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: color.background,
    },
    articleContainer: {
        flex: 1,
        backgroundColor: color.background,
        padding: size.scale(10)
    },
    headingText: {
        fontSize: size.scale(24),
        color: color.text,
        fontFamily: typography.primaryBold,
        marginTop: size.scale(10),
        marginBottom: size.scale(5)
    },
    articleText: {
        fontSize: size.scale(20),
        color: color.text,
        fontFamily: typography.primary,
        marginVertical: size.scale(10),
    },
    link: {
        color: color.primary,
        fontSize: size.scale(14),
        fontFamily: typography.primaryBoldItalic,
        marginTop: size.scale(10),
    },
    articleInfo: {
        fontSize: size.scale(12),
        color: color.lightGrey,
        fontFamily: typography.primaryItalic,
    },
    articleImage: {
        width: size.scale(100),
        height: size.scale(100),
        borderRadius: size.scale(10),
        alignSelf: 'center',
        marginRight: size.scale(10),
    },
});