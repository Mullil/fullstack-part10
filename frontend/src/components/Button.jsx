import { StyleSheet, Pressable } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 10,
    flexShrink: 1,
    alignItems: 'center',
  },
  colorSecondary: {
    backgroundColor: 'red',
  },
  colorPrimary: {
    backgroundColor: theme.colors.primary,
  },
});

const Button = ({ backgroundColor, text, onPress }) => {
  const buttonStyle = [styles.button,
    backgroundColor === 'blue' && styles.colorPrimary,
    backgroundColor === 'red' && styles.colorSecondary,
  ];
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text color="textTertiary" fontWeight="bold">{text}</Text>
    </Pressable>
  );
};

export default Button;