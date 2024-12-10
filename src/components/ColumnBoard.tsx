import { useFonts } from "expo-font";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Column from "./Column";
import { DraxView } from "react-native-drax";
import { useCardContext } from "../context/CardContext";

export default function ColumnBoard() {
  const { columns, handleSubmit, resetCards } = useCardContext();
  const [loaded, error] = useFonts({
    HelveticaNeueBold: require("../../assets/fonts/HelveticaNeueBold.otf"),
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <DraxView style={styles.columnContainer}>
        {columns.map((column) => (
          <Column
            key={column.columnId}
            columnId={column.columnId}
            name={column.columnTitle}
            cards={column.cards}
          ></Column>
        ))}
      </DraxView>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.submitButton} onPress={() => handleSubmit()}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 15 },
  columnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  submitButton: {
    backgroundColor: "#FF00AB",
    alignSelf: "center",
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  submitText: {
    fontFamily: "HelveticaNeueBold",
    color: "white",
    fontSize: 30,
  },
  resetButton: {
    backgroundColor: "yellow",
    alignSelf: "center",
    padding: 10,
  },
  resetText: {
    fontSize: 30,
  },
});
