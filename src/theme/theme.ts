import { MD3DarkTheme, MD3LightTheme, MD3Theme } from "react-native-paper";

export interface CustomTheme extends MD3Theme {
  colors: MD3Theme["colors"] & {
    text: string; // high-contrast text
    textSecondary: string; // low-contrast text
    backgroundSolid: string; // solid background
    backgroundSolidSecondary: string; // hovered solid background
    borderSeparator: string; // ui element border
    borderSeparatorSecondary: string; // hovered ui element border
    borderSeparatorTertiary: string; // sub ui element border
    interactiveComponents: string; // ui element background
    interactiveComponentsSecondary: string; // hovered ui element background
    interactiveComponentsTertiary: string; // active ui element background
    background: string; // app background
    backgroundSecondary: string; // subtle background
  };
}

export const darkTheme: CustomTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    textSecondary: "#ADF0D4",
    text: "#1FD8A4",
    backgroundSolidSecondary: "#27B08B",
    backgroundSolid: "#29A383",
    borderSeparatorTertiary: "#2A7E68",
    borderSeparatorSecondary: "#246854",
    borderSeparator: "#1B5745",
    interactiveComponentsTertiary: "#114837",
    interactiveComponentsSecondary: "#0B3B2C",
    interactiveComponents: "#0F2E22",
    backgroundSecondary: "#0F2E22",
    background: "#0D1512",
    onSurface: "#1FD8A4",
  },
};

export const lightTheme: CustomTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    textSecondary: "#1D3B31",
    text: "#208368",
    backgroundSolidSecondary: "#26997B",
    backgroundSolid: "#29A383",
    borderSeparatorTertiary: "#56BA9F",
    borderSeparatorSecondary: "#8BCEB6",
    borderSeparator: "#ACDEC8",
    interactiveComponentsTertiary: "#C3E9D7",
    interactiveComponentsSecondary: "#D6F1E3",
    interactiveComponents: "#E6F7ED",
    backgroundSecondary: "#F4FBF7",
    background: "#FBFEFD",
    onSurface: "#208368",
  },
};
