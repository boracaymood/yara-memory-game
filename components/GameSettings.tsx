import { StyleSheet, View } from "react-native";
import GameButton from "./GameButton";
import GameText from "./GameText";

interface GameSettingsProps {
  winCondition: boolean;
  resetGame: () => void;
  changeDifficulty: () => void;
}

const GameSettings = ({
  winCondition,
  resetGame,
  changeDifficulty,
}: GameSettingsProps) => {
  return (
    <View style={styles.gameSettingsContainer}>
      <GameButton onPress={resetGame} text="New Game" />
      <GameButton onPress={changeDifficulty} text="Change Difficulty" />
      {winCondition && <GameText text="You win!" />}
    </View>
  );
};

const styles = StyleSheet.create({
  gameSettingsContainer: {
    alignContent: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default GameSettings;
