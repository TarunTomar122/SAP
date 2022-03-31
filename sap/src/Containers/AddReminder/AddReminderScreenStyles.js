import { StyleSheet } from 'react-native';

import { color, colorLight, size, typography } from '../../theme';

export default StyleSheet.create({
    darkHomeContainer: {
        flex: 1,
        backgroundColor: color.background,
    },
    lightHomeContainer: {
        flex: 1,
        backgroundColor: colorLight.background,
    },
    darkHeader: {
        backgroundColor: color.background,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: size.scale(100),
    },
    lightHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colorLight.background,
        height: size.scale(100),
    },
    container: {
        padding: size.scale(20),
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
        marginBottom: size.scale(30),
        backgroundColor: color.lightBackground,
        height: size.scale(50),
    },
    darkPickText: {
        fontSize: size.scale(22),
        color: color.lightGrey,
        fontFamily: typography.primaryBold,
    },
    lightPickText: {

    },
    elevation: {
        elevation: size.scale(6),
        shadowColor: color.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: size.scale(10),
        borderColor: color.background
    },
    pickerDropDown: {
        backgroundColor: color.background,
        borderRadius: size.scale(10),
        marginTop: size.scale(20),
        borderColor: color.background
    },
    pickText: {
        fontSize: size.scale(22),
        color: color.text,
        fontFamily: typography.primaryBold,
        marginTop: size.scale(20),
    },
    dateContainer: {
        backgroundColor: color.text,
        flex: 1,
        marginVertical: size.scale(26),
    },
    darkButtonText: {
        color: color.primary,
        fontFamily: typography.primary,
        fontSize: size.scale(20),
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});