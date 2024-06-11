import { StyleSheet, View } from "react-native";
import TileCard from "./TileCard";

interface TileCardsProps {
  tileCards: number[];
  openCards: number[];
  clearedCards: number[];
  rowSize: number;
  onTileCardPress: (index: number) => void;
}

const TileCards = ({
  tileCards,
  openCards,
  clearedCards,
  rowSize,
  onTileCardPress,
}: TileCardsProps) => {
  return (
    <View style={styles.tileCardsContainer}>
      {tileCards.map((imageNum, index) => (
        <TileCard
          key={imageNum + "-" + index}
          imageNum={imageNum}
          rowSize={rowSize}
          isOpen={openCards.includes(index) || clearedCards.includes(index)}
          onClick={() => {
            onTileCardPress(index);
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tileCardsContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});

export default TileCards;
