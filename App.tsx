import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Asset } from "expo-asset";
import Game from "./components/Game";

const cacheImages = (images: any[]) => {
  return images.map((image) => {
    return Asset.fromModule(image).downloadAsync();
  });
};

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  // Preload tile images
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        const imageAssets = cacheImages([
          require("./assets/tileImages/01_Yara-NTester.png"),
          require("./assets/tileImages/02_YaraTera.png"),
          require("./assets/tileImages/03_YaraBela.png"),
          require("./assets/tileImages/04_YaraVita.png"),
          require("./assets/tileImages/05_YaraVera.png"),
          require("./assets/tileImages/06_YaraRega.png"),
          require("./assets/tileImages/07_YaraMila.png"),
          require("./assets/tileImages/08_YaraLiva.png"),
          require("./assets/tileImages/09_YaraPrideLogo.png"),
        ]);

        await Promise.all([...imageAssets]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Game />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default App;
