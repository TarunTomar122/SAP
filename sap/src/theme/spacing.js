import {size} from './size';

/**
 * The available spacing.
 *
 * Here's the rough guideline.  Customize this for you usage.  It's ok to put exceptions
 * within the components themselves if they are truly exceptions.
 *
 * 0 = none    - nothing. only here to bust out of a zero-based array.
 * 1 = tiny    - elements contextually close to each other
 * 2 = smaller - for groups of closely related items or perhaps borders
 * 3 = small   - ?
 * 4 = medium  - ?
 * 5 = medium+ - ?
 * 6 = large   - between groups of content that aren't related?
 * 7 = huge    - ?
 * 8 = massive - an uncomfortable amount of whitespace
 */
// export const spacing = [0, 4, 8, 12, 16, 24, 32, 48, 64]
export const spacing = {
  none: size.moderateScale(0),
  tiny: size.moderateScale(4),
  smaller: size.moderateScale(8),
  small: size.moderateScale(12),
  medium: size.moderateScale(18),
  mediumPlus: size.moderateScale(24),
  large: size.moderateScale(32),
  huge: size.moderateScale(48),
  massive: size.moderateScale(64),
  extra: size.moderateScale(54),
};
