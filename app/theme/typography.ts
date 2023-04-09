export const customFontsToLoad = {
  'Tajawal-Bold': require("@assets/fonts/Tajawal-Bold.ttf"),
  'Tajawal-Medium': require("@assets/fonts/Tajawal-Medium.ttf"),
  'Tajawal-Regular': require("@assets/fonts/Tajawal-Regular.ttf"),
}

const fonts = {
  spaceGrotesk: {
    // Cross-platform Google font.
    light: "spaceGroteskLight",
    normal: "spaceGroteskRegular",
    medium: "spaceGroteskMedium",
    semiBold: "spaceGroteskSemiBold",
    bold: "spaceGroteskBold",
  },
  Tajawal: {
    light: "Tajawal-Regular",
    normal: "Tajawal-Regular",
    medium: "Tajawal-Medium",
    semiBold: "Tajawal-Medium",
    bold: "Tajawal-Bold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.Tajawal,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  // secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  // code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
