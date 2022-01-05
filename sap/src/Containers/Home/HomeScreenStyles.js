import { StyleSheet } from 'react-native';

import { color, size, typography } from '../../theme';

export default StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: color.background,
    padding: size.scale(10)
  },
  headingText: {
    fontSize: size.scale(18),
    color: color.text,
    fontFamily: typography.primaryBold,
    marginVertical: size.scale(10),
    marginHorizontal: size.scale(10)
    // alignSelf: 'center'
  },
  contribCont: {
    flex: 1,
    backgroundColor: color.background,
    paddingBottom: size.scale(30),
    paddingTop: size.scale(20),
    borderBottomWidth: 1,
    borderBottomColor: color.lightGrey,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: size.scale(10),
    marginBottom: size.scale(20),
    marginHorizontal: size.scale(10)
  },
  button: {
    // backgroundColor: color.primary,
    padding: size.scale(10),
    borderRadius: size.scale(5),
    borderBottomWidth: 1,
    borderColor: color.primary,
    marginHorizontal: size.scale(10)
  },
  buttonText: {
    color: color.text,
    fontSize: size.scale(16),
    fontFamily: typography.primaryBold,
    textAlign: 'center'
  },
  mainContainerArticles: {
    flex: 1,
    // paddingBottom: size.scale(60),
  },
  articlesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.background,
    // paddingBottom: size.scale(30),
    paddingVertical: size.scale(10),
    paddingHorizontal: size.scale(10),
    borderBottomWidth: 1,
    borderBottomColor: color.lightGrey,
  },
  articleImage: {
    width: size.scale(60),
    height: size.scale(60),
    borderRadius: size.scale(10),
    alignSelf: 'center',
    marginRight: size.scale(10),
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: size.scale(10),
  },
  articlesTitle: {
    fontSize: size.scale(18),
    color: color.text,
    fontFamily: typography.primaryBold,
    // marginVertical: size.scale(10),
  },
  articlesDesc: {
    fontSize: size.scale(14),
    color: color.text,
    fontFamily: typography.primaryRegular,
    // marginVertical: size.scale(10),
  },
  nextPageContainer:{
    flex: 1,
    flexDirection: 'row',
    paddingVertical: size.scale(10),
    paddingHorizontal: size.scale(10),
    marginBottom: size.scale(70),
  },
  nextPageText:{
    fontSize: size.scale(16),
    color: color.primary,
  }
});
