import {palette} from './palette';

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  palette,

  transparent: 'rgba(0, 0, 0, 0)',

  background: palette.black,

  description: palette.description,

  secondary: palette.secondary,

  lightGrey: palette.lightGrey,

  grey: palette.grey,

  primary: palette.orange,

  primaryDarker: palette.reddish,

  icons: palette.reddish,

  line: palette.offWhite,

  text: palette.white,

  dim: palette.lightGrey,

  error: palette.angry,

  storybookDarkBg: palette.black,

  storybookTextColor: palette.black,
};
