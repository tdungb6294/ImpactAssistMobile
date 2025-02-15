import { DefaultTheme, MD3DarkTheme } from "react-native-paper";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#007BFF", //buttons + links
    secondary: "#FF3B30", //warnings + errors
    background: "#F5F5F5",
    surface: "#FFFFFF",
    primaryText: "#212121", //dark text
    secondaryText: "#757575", // light text for secondary
    success: "#34C759",
    error: "#D32F2F",
    warning: "#FFEB3B",
    primaryButton: "#007BFF",
    secondaryButton: "#BDBDBD",
    textFieldBorder: "#B0BEC5",
    focusedTextFieldBorder: "#2196F3",
    cardBackground: "#FFFFFF",
    divider: "#E0E0E0",
    primaryIcon: "#007BFF",
    secondaryIcon: "#FF3B30",
    inactiveIcon: "#B0BEC5",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#1E88E5", //buttons + links
    secondary: "#FF3B30", //warnings + errors
    background: "#121212",
    surface: "#1D1D1D",
    primaryText: "#E0E0E0", //dark text
    secondaryText: "#B0B0B0", // light text for secondary
    success: "#34C759",
    error: "#FF4B5C",
    warning: "#FFEB3B",
    primaryButton: "#007BFF",
    secondaryButton: "#4A4A4A",
    textFieldBorder: "#616161",
    focusedTextFieldBorder: "#2196F3",
    cardBackground: "#2C2C2C",
    divider: "#3A3A3A",
    primaryIcon: "#1E88E5",
    secondaryIcon: "#FF3B30",
    inactiveIcon: "#616161",
  },
};
