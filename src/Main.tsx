import { DraxSnapbackTargetPreset, DraxView } from "react-native-drax";
import Card from "./components/Card";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  Text,
  Modal,
} from "react-native";
import { useState } from "react";
import InitialBoard from "./components/InitialBoard";
import ColumnBoard from "./components/ColumnBoard";
import LottieView from "lottie-react-native";
import { useCardContext } from "./context/CardContext";

export default function Main() {
  const { isWin, setIsWin } = useCardContext();
  return (
    <SafeAreaView style={styles.safeContainer}>
      {isWin && (
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
      )}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>FADSEN</Text>
        </View>
        <InitialBoard></InitialBoard>
        <ColumnBoard></ColumnBoard>
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
    paddingTop: Platform.OS === "android" ? 50 : 0,
    gap: 30,
  },
  header: {
    backgroundColor: "#232323",
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
  },
  headerText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
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
