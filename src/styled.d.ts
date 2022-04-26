import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    TapColor: string;
    contentsTextColor: string;
    contentsTapColor: string;
    textColor: string;
    bgColor: string;
    accentColor: string;
    themeColor?: string;
  }
}
