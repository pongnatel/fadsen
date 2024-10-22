import { View, StyleSheet } from "react-native";
import Column from "./Column";
import { DraxView } from "react-native-drax";
import { useCardContext } from "../context/CardContext";

export default function ColumnBoard() {
  const { columns } = useCardContext();
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
