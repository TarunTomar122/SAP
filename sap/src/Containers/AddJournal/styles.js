import { StyleSheet } from 'react-native';

import { colorLight, color, size, typography } from '../../theme';

export default StyleSheet.create({
    darkHome: {
        flex: 1,
        backgroundColor: color.background,
        paddingVertical: size.scale(80),
        paddingHorizontal: size.scale(20),
    },
    darkQuestionContainer: {
        flex: 1,
        backgroundColor: color.background,
        padding: size.scale(15),
    },
    darkQuestion: {
        color: color.primary,
        fontSize: size.scale(32),
        fontFamily: typography.primaryBold,
    },
    darkInput: {
        color: color.lightGrey,
        fontSize: size.scale(18),
        fontFamily: typography.primary,
        borderColor: color.primary,
        borderBottomWidth: 1,
        marginTop: size.scale(40),
    },
    darkButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    darkNextButton: {
        borderWidth: 1,
        borderColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: size.scale(10),
        paddingVertical: size.scale(15),
        marginTop: size.scale(50),
        width: '40%',
        marginBottom: size.scale(40),
    },
    darkNextButtonText: {
        color: color.lightGrey,
        fontSize: size.scale(18),
        fontFamily: typography.primaryBold,
    },
    darkIconContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: size.scale(40),
    },
});
