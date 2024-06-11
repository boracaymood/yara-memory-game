import { StyleSheet, Text } from "react-native";

interface GameTextProps {
  text: string;
}

const GameText = ({ text }: GameTextProps) => {
  return <Text style={styles.textStyle}>{text}</Text>;
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default GameText;
