import { StyleSheet } from 'react-native';
import { color, colorLight, size, typography } from '../../theme';

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    darkHomeContainer: {
        flex: 1,
        backgroundColor: color.background,
        paddingTop: size.scale(20),
    },
    lightHomeContainer: {
        flex: 1,
        backgroundColor: colorLight.background,
    },
    darkCardContainer: {
        padding: size.scale(10),
        paddingVertical: size.scale(20),
        marginHorizontal: size.scale(6),
        marginVertical: size.scale(6),
        borderLeftWidth: 0.5,
        borderColor: color.separator,
        flexDirection: 'row',
        alignItems: 'center',
    },
    columnTitle: {
        fontSize: size.scale(28),
        fontFamily: typography.primaryBold,
        color: color.primary,
        marginVertical: size.scale(10),
        marginHorizontal: size.scale(10),
    },
    darkColumn: {
        backgroundColor: color.background,
        borderRadius: size.scale(10),
        marginHorizontal: size.scale(10),
        marginVertical: size.scale(10),
        padding: size.scale(10),
        alignItems: 'center',
        width: width - 20,
    },
    elevation: {
        elevation: 4,
        shadowColor: color.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: size.scale(10),
        padding: size.scale(15),
    },
    darkCard: {
        flexDirection: 'row',
        width: width - 50,
        backgroundColor: color.background,
        borderRadius: size.scale(10),
        marginHorizontal: size.scale(10),
        marginVertical: size.scale(10),
        padding: size.scale(10),
        alignItems: 'center',
    },
    darkCardTitle: {
        marginLeft: size.scale(10),
        color: color.text,
        fontFamily: typography.primaryBold,
        fontSize: size.scale(20),
        flex: 1,
        flexWrap: 'wrap'
    },
    darkCardTitleCompleted: {
        marginLeft: size.scale(10),
        fontFamily: typography.primaryBold,
        fontSize: size.scale(20),
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: color.lightGrey,
        flex: 1,
        flexWrap: 'wrap'
    }
});
