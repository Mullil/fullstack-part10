import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textTertiary: 'white',
    primary: '#0366d6',
    secondary: '#24292e'
  },
  fontSizes: {
    heading: 24,
    body: 14,
    subheading: 16,
    rating: 20,
  },
  fonts: Platform.select({
    android: 'Roboto',
    ios: 'Arial',
    default: 'System',
  }),
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;