import { DraxSnapbackTargetPreset, DraxView } from "react-native-drax";
import Card from "./components/Card";
import { SafeAreaView, StyleSheet, View, Platform, Text } from "react-native";
import { useState } from "react";
import InitialBoard from "./components/InitialBoard";
import ColumnBoard from "./components/ColumnBoard";

export default function Main() {
  const [isDragOver, setIsDragOver] = useState(false);
  return (
    <SafeAreaView style={styles.safeContainer}>
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
