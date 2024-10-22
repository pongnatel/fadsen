import { View, StyleSheet, Pressable, Text } from "react-native";
import Column from "./Column";
import { DraxView } from "react-native-drax";
import { useCardContext } from "../context/CardContext";
import { useEffect } from "react";

export default function ColumnBoard() {
  const { columns, handleSubmit } = useCardContext();

  return (
    <View>
      <DraxView style={styles.container}>
        {columns.map((column) => (
          <Column
            key={column.columnId}
            columnId={column.columnId}
            name={column.columnTitle}
            cards={column.cards}
          ></Column>
        ))}
      </DraxView>
      <Pressable style={styles.submitButton} onPress={() => handleSubmit()}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  submitButton: {
    backgroundColor: "yellow",
    alignSelf: "center",
    padding: 10,
  },
  submitText: {
    fontSize: 40,
  },
});
