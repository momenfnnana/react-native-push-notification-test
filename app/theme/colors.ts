// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral100: "#FFFFFF",
  neutral150: "#F8F9FB",
  neutral200: "#F4F6F9",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral750: "#323232",
  neutral800: "#262626",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  redPalette: {
    red: "#EF4444", // Main
    redLight: "#FEE2E2",
    redDark: "#B91C1C",
  },
  greenPalette: {
    green: "#087F23", // Main
    green2: "#00C851",
    greenLight: "#E7F3E7",
    greenSimiLight: "#B5B5B5",
    greenDark: "#005005",
    greenSecondary: "#B6B7B7",
    greenSecondary2: "#a3a3a3",
  },
  angry300: "#F8DBE2",
  angry500: "#D61010",
  reject: "#EF0000",

  primary: "#D2133F",
  secondary: "#E2EBFC",
  defult: "#718096",
  accepted: "#02BC15",
  rejected: "#CF466F",
  underReview: "#4F43F9",
  underReview2: "#2C60E9",
  underProcessing: "#E0C238",
  activetab: "#4B5FD4",
  inactivetab: "#718096",
  deviderColor: "#AFB1BE",
  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
  overlay60: "#232429",
  gray: "#8C98A9",
  pink: "#F8DBE2",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,

  accepted: palette.accepted,
  rejected: palette.rejected,
  underReview: palette.underReview,
  underProcessing: palette.underProcessing,
  primary: palette.primary,
  secondary: palette.secondary,
  defult: palette.defult,
  offWhite: palette.neutral200,
  dark: palette.neutral800,
}
