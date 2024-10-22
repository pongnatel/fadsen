import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { DraxProvider, DraxView } from "react-native-drax";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CardProvider } from "./src/context/CardContext";
import Main from "./src/Main";

export default function App() {
  return (
    <GestureHandlerRootView>
      <DraxProvider>
        <CardProvider>
          <Main />
        </CardProvider>
      </DraxProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  draggable: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
  },
  receiver: {
    width: 100,
    height: 100,
    backgroundColor: "green",
  },
});
