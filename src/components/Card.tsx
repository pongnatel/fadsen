import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
} from "react-native";
import { DraxSnapbackTargetPreset, DraxView } from "react-native-drax";
import { useCardContext } from "../context/CardContext";

type CardProps = {
  cardID: number;
  content: string | null;
  correctColumnId: number;
  style?: StyleProp<ViewStyle>;
};

const { height, width } = Dimensions.get("window");

// Define the Card component
export default function Card({
  cardID,
  content,
  correctColumnId,
  style,
}: CardProps) {
  const { initialBoard, removeCard } = useCardContext();

  return (
    <DraxView
      id={cardID.toString()}
      style={[styles.card, style]}
      onDragStart={() => {
        console.log("start drag");
      }}
      onDragEnd={(arg) => {
        console.log("Parent id: ", arg.dragged.parentId);
        return DraxSnapbackTargetPreset.None;
      }}
      onDragDrop={() => {
        removeCard(cardID);
      }}
      draggingStyle={styles.dragging}
      payload={{ cardID, content, correctColumnId }}
    >
      <Text style={styles.content}>{content}</Text>
    </DraxView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    width: "30%",
    height: "20%",
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
  },
  content: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dragging: {
    backgroundColor: "#D2D4D1", // Color when dragging
  },
});
