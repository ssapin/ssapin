import { pixelToRem } from "../utils/functions/util";

const colors = {
  /**  Main */
  mainBlue: "#1F619F",
  DeepBlue: "#467BAE",
  lightBlue: "#3396F4",
  mediumBlue: "#A3BED8",
  lightLightBlue: "#E8F4FF",
  mainNavy: "#11416F",

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

const fontFamily = {
  h1: "S-CoreDream-5Medium",
  h2: "S-CoreDream-5Medium",
  h3: "S-CoreDream-5Medium",
  h4: "S-CoreDream-5Medium",
  h5: "S-CoreDream-5Medium",
  h1bold: "S-CoreDream-7ExtraBold",
  h2bold: "S-CoreDream-7ExtraBold",
  h3bold: "S-CoreDream-7ExtraBold",
  h4bold: "S-CoreDream-7ExtraBold",
  h5bold: "S-CoreDream-7ExtraBold",
  paragraph: "S-CoreDream-4Regular",
  s1: "S-CoreDream-4Regular",
  s2: "S-CoreDream-4Regular",
  s3: "S-CoreDream-4Regular",
  s4: "S-CoreDream-4Regular",
  paragraphbold: "S-CoreDream-6Bold",
  s1bold: "S-CoreDream-6Bold",
  s2bold: "S-CoreDream-6Bold",
  s3bold: "S-CoreDream-6Bold",
  s4bold: "S-CoreDream-6Bold",
};

const mq = {
  tablet: `@media only screen and (max-width: ${pixelToRem(900)})`,
  mobile: `@media only screen and (max-width: ${pixelToRem(500)})`,
};

export const themes = {
  colors,
  fontSizes,
  fontFamily,
  mq,
};

export default themes;
