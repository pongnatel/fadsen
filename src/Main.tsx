import { DraxSnapbackTargetPreset, DraxView } from "react-native-drax";
import Card from "./components/Card";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  Text,
  Modal,
  Image,
  ImageBackground,
  StatusBar,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import InitialBoard from "./components/InitialBoard";
import ColumnBoard from "./components/ColumnBoard";
import LottieView from "lottie-react-native";
import { useCardContext } from "./context/CardContext";

const background = { uri: "../assets/fadsen/game 1.png" };

export default function Main() {
  const { isWin, setIsWin, resetCards } = useCardContext();
  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar hidden={true} />
      {/* {isWin && (
          <Modal transparent>
            <LottieView
              source={require("../assets/congrats.json")}
              style={{ width: "100%", height: "100%" }}
              autoPlay
              loop={false}
              onAnimationFinish={() => setIsWin(false)}
            />
          </Modal>
        )}
        {isWin && (
          <Modal transparent>
            <LottieView
              source={require("../assets/test.json")}
              style={{ width: "100%", height: "100%" }}
              autoPlay
            />
          </Modal>
        )} */}
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/fadsen/background.png")}
          resizeMode="cover"
          style={styles.background}
        >
          <View style={styles.header}>
            {/* <Text style={styles.headerText}>FADSEN</Text> */}
            <Pressable onPress={() => resetCards()}>
              <Image
                source={require("../assets/fadsen/logo.png")}
                style={styles.imageLogo}
                resizeMode="contain"
              />
            </Pressable>
            <Image
              source={require("../assets/fadsen/game1.png")}
              style={styles.imageTitle}
            />
          </View>
          <InitialBoard></InitialBoard>
          <ColumnBoard></ColumnBoard>
          <Image
            source={require("../assets/fadsen/butterfly.png")}
            resizeMode="contain"
            style={{
              height: 250,
              width: 250,
              alignSelf: "center",
              position: "absolute",
              bottom: 0,
              left: 0,
              transform: [{ translateX: -40 }, { translateY: 40 }],
            }}
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    gap: 10,
  },
  imageLogo: {
    width: 140,
  },
  imageTitle: {
    width: 160,
    resizeMode: "contain",
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -80 }], // Centers the image
  },
  header: {
    backgroundColor: "#FF00AB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 80,
  },
  receiver: {
    height: 300,
    width: 300,
    backgroundColor: "red",
  },
  dragOver: {
    backgroundColor: "#87CEEB", // Color during drag over
  },
});
function useNavigationBar(arg0: { color: string; hide: boolean }) {
  throw new Error("Function not implemented.");
}
