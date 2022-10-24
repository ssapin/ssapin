import { pixelToRem } from "../utils/functions/util";

const colors = {
  /**  Main */
  mainBlue: "#1F619F",
  DeepBlue: "#467BAE",
  lightBlue: "#3396F4",
  mediumBlue: "#A3BED8",
  lightLightBlue: "#E8F4FF",

  /** Sub */
  mainYellow: "#FFE651",
  subYellow: "#FFE792",
  mainRed: "#FC0000",
  /** GrayScale */
  gray900: "#171717",
  gray800: "#262626",
  gray700: "#404040",
  gray600: "#525252",
  gray500: "#737373",
  gray400: "#999999",
  gray300: "#d4d4d4",
  gray200: "#E4E4E4",
  gray100: "#f5f5f5",
  gray50: "#fafafa",
  gray0: "#ffffff",
};

const fontSizes = {
  h1: pixelToRem(36),
  h2: pixelToRem(30),
  h3: pixelToRem(24),
  h4: pixelToRem(20),
  h5: pixelToRem(18),
  paragraph: pixelToRem(16),
  s1: pixelToRem(14),
  s2: pixelToRem(12),
  s3: pixelToRem(10),
  s4: pixelToRem(6),
};

export const themes = {
  colors,
  fontSizes,
};

export default themes;
