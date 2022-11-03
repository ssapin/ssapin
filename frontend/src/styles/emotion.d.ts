import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      mainBlue: string;
      DeepBlue: string;
      lightBlue: string;
      mediumBlue: string;
      lightLightBlue: string;
      mainNavy: string;
      mainYellow: string;
      subYellow: string;
      mainRed: string;
      gray900: string;
      gray800: string;
      gray700: string;
      gray600: string;
      gray500: string;
      gray400: string;
      gray300: string;
      gray200: string;
      gray100: string;
      gray50: string;
      gray0: string;
    };
    fontSizes: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      paragraph: string;
      s1: string;
      s2: string;
      s3: string;
      s4: string;
    };
    fontFamily: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      paragraph: string;
      s1: string;
      s2: string;
      s3: string;
      s4: string;
      h1bold: string;
      h2bold: string;
      h3bold: string;
      h4bold: string;
      h5bold: string;
      paragraphbold: string;
      s1bold: string;
      s2bold: string;
      s3bold: string;
      s4bold: string;
    };
    mq: {
      tablet: string;
      mobile: string;
      pc: string;
    };
  }
}
