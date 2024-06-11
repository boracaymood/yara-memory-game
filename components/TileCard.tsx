import { useEffect, useRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const imagesArray = [
  require("../assets/tileImages/01_Yara-NTester.png"),
  require("../assets/tileImages/02_YaraTera.png"),
  require("../assets/tileImages/03_YaraBela.png"),
  require("../assets/tileImages/04_YaraVita.png"),
  require("../assets/tileImages/05_YaraVera.png"),
  require("../assets/tileImages/06_YaraRega.png"),
  require("../assets/tileImages/07_YaraMila.png"),
  require("../assets/tileImages/08_YaraLiva.png"),
  require("../assets/tileImages/09_YaraPrideLogo.png"),
];

export interface TileCardProps {
  imageNum: number;
  rowSize: number;
  isOpen: boolean;
  onClick: () => void;
}

const TileCard = ({ imageNum, rowSize, isOpen, onClick }: TileCardProps) => {
  const spin = useSharedValue<number>(0);
  const firstUpdate = useRef(true);

  const animatedFrontStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const animatedBackStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const spinCard = () => {
    spin.value = spin.value ? 0 : 1;
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    spinCard();
  }, [isOpen]);

  const windowWidth = Dimensions.get("window").width;
  const tileSize = windowWidth / (rowSize + 1);
  const styleObject = styles(rowSize, tileSize);

  return (
    <Pressable onPress={!isOpen ? onClick : null}>
      <Animated.View style={[styleObject.backSide, animatedBackStyle]}>
        <Text style={styleObject.questionMarkText}>?</Text>
      </Animated.View>
      <Animated.View style={[styleObject.frontSide, animatedFrontStyle]}>
        <Image
          style={styleObject.tileImage}
          source={imagesArray[imageNum || 0]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = (rowSize: number, tileSize: number) =>
  StyleSheet.create({
    frontSide: {
      borderColor: "black",
      borderWidth: 1,
      backgroundColor: "#D8D9CF",
      borderRadius: 32 / rowSize,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      width: tileSize,
      height: tileSize,
    },
    backSide: {
      borderColor: "black",
      borderWidth: 1,
      backgroundColor: "white",
      borderRadius: 32 / rowSize,
      backfaceVisibility: "hidden",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
      width: tileSize,
      height: tileSize,
    },
    questionMarkText: {
      fontSize: 200 / rowSize,
    },
    tileImage: {
      width: tileSize,
      height: tileSize,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 32 / rowSize,
    },
  });

export default TileCard;
