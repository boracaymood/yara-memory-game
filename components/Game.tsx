import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import GameDifficulty from "./GameDifficulty";
import GameSettings from "./GameSettings";
import TileCards from "./TileCards";

const shuffleArray = (array: number[]) => {
  let m = array.length;
  let t;
  let i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

const Game = () => {
  const insets = useSafeAreaInsets();
  const [rowSize, setRowSize] = useState<number | null>(null);
  const [tileCards, setTileCards] = useState<number[]>([]);
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<number[]>([]);

  const startGame = (numberOfImages: number) => {
    // From 9 images, pick N images to be included in the game
    const chosenImages = shuffleArray(Array.from(Array(9).keys())).slice(
      0,
      numberOfImages
    );

    // Duplicate and shuffle the chosen images
    const shuffledImages = shuffleArray([...chosenImages, ...chosenImages]);
    setRowSize(numberOfImages / 2);
    setTileCards(shuffledImages);
    setOpenCards([]);
    setClearedCards([]);
  };

  // Comparison function
  const compareTileCards = () => {
    const [first, second] = openCards;

    // If both open cards are the same image, add to cleared cards
    if (tileCards[first] === tileCards[second]) {
      const newClearedCards = clearedCards.concat([first, second]);

      setClearedCards(newClearedCards);
      setOpenCards([]);
      return;
    }
    // Else, close opened cards after 2 seconds
    setTimeout(() => {
      setOpenCards([]);
    }, 2000);
  };

  const onTileCardPress = (index: number) => {
    // Only activate click function when less than 2 cards are open, to prevent other cards from opening
    if (openCards.length < 2) {
      setOpenCards((prev) => [...prev, index]);
    }
  };

  // Reset tiles and change difficulty
  const setDifficultyAndResetGame = (numberOfImages: number | null) => {
    setTileCards([]);
    if (numberOfImages) {
      startGame(numberOfImages);
    } else {
      setRowSize(null);
    }
  };

  // Effect for creating minor delay before comparing opened tiles
  useEffect(() => {
    if (openCards.length === 2) {
      setTimeout(compareTileCards, 500);
    }
  }, [openCards]);

  const styleObject = styles(insets);

  return (
    <View style={styleObject.gameContainer}>
      <Text style={styleObject.headerText}>Yara Memory Game</Text>
      {tileCards.length && rowSize ? (
        <View style={styleObject.mainContentContainer}>
          <GameSettings
            winCondition={clearedCards.length === tileCards.length}
            resetGame={() => startGame(rowSize * 2)}
            changeDifficulty={() => setDifficultyAndResetGame(null)}
          />
          <TileCards
            tileCards={tileCards}
            openCards={openCards}
            clearedCards={clearedCards}
            rowSize={rowSize}
            onTileCardPress={onTileCardPress}
          />
        </View>
      ) : (
        <GameDifficulty setDifficulty={setDifficultyAndResetGame} />
      )}
    </View>
  );
};

const styles = (insets: EdgeInsets) =>
  StyleSheet.create({
    gameContainer: {
      flex: 1,
      marginTop: insets.top + 15,
      marginBottom: insets.bottom + 15,
      width: "95%",
      alignContent: "center",
    },
    headerText: {
      fontSize: 30,
      textAlign: "center",
    },
    mainContentContainer: {
      flex: 1,
      alignContent: "center",
      justifyContent: "center",
    },
    tileCardsContainer: {
      flex: 1,
      alignContent: "center",
      justifyContent: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
  });

export default Game;
