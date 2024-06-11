import { StyleSheet, View } from "react-native";
import GameButton from "./GameButton";
import GameText from "./GameText";

interface GameDifficultyProps {
  setDifficulty: (numberOfImages: number) => void;
}

const GameDifficulty = ({ setDifficulty }: GameDifficultyProps) => {
  return (
    <View style={styles.difficultyButtonContainer}>
      <GameText text="Select Difficulty" />
      <GameButton onPress={() => setDifficulty(4)} text="Easy" />
      <GameButton onPress={() => setDifficulty(6)} text="Medium" />
      <GameButton onPress={() => setDifficulty(8)} text="Hard" />
    </View>
  );
};

const styles = StyleSheet.create({
  difficultyButtonContainer: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
    gap: 10,
  },
});

export default GameDifficulty;
