import { Pressable, StyleSheet, Text } from "react-native";

interface GameButtonProps {
  text: string;
  onPress: () => void;
}

const GameButton = ({ text, onPress }: GameButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.gameButton}>
      <Text style={styles.gameButtonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gameButton: {
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 16,
  },
  gameButtonText: { fontSize: 20 },
});

export default GameButton;
