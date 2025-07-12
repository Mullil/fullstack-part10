import { StyleSheet } from "react-native";
import theme from "../../theme";

export const itemStyles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 3,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'center',
  },
  picture: {
    height: 55,
    width: 55,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flexShrink: 1,
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'column',
    flexShrink: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center'
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 2,
    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 5,
  }
});