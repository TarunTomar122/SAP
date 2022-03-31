import { darkPalette, lightPalette } from './palette';

export const color = {

  darkPalette,
  transparent: 'rgba(0, 0, 0, 0)',
  background: darkPalette.background,
  lightBackground: darkPalette.lightBackground,
  primary: darkPalette.primary,
  lightGrey: darkPalette.lightGrey,
  darkGrey: darkPalette.darkGrey,

  description: darkPalette.description,

  secondary: darkPalette.secondary,

  grey: darkPalette.grey,


  primaryDarker: darkPalette.reddish,

  icons: darkPalette.reddish,

  line: darkPalette.offWhite,

  text: darkPalette.white,

  dim: darkPalette.lightGrey,

  error: darkPalette.angry,

  storybookDarkBg: darkPalette.black,

  storybookTextColor: darkPalette.black,

  searchText: darkPalette.lightGrey,

  separator: darkPalette.orangeDarker,
};

export const colorLight = {
  lightPalette,
  background: lightPalette.background,
  lightGrey: darkPalette.lightGrey,
  darkGrey: darkPalette.darkGrey,
  text: lightPalette.black,
}