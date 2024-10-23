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
  isCorrect?: boolean;
  style?: StyleProp<ViewStyle>;
};

const { height, width } = Dimensions.get("window");

// Define the Card component
export default function Card({
  cardID,
  content,
  correctColumnId,
  style,
  isCorrect,
}: CardProps) {
  const { removeCard } = useCardContext();

  const cardStyle =
    isCorrect === undefined
      ? {} // No style if 'isCorrect' is not defined
      : isCorrect
      ? styles.correct // Apply correct style
      : styles.incorrect; // Apply incorrect style

  return (
    <DraxView
      id={cardID.toString()}
      style={[styles.card, style, cardStyle]}
      onDragStart={(arg) => {}}
      onDragEnd={(arg) => {
        return DraxSnapbackTargetPreset.None;
      }}
      onDragDrop={(arg) => {}}
      onReceiveDragDrop={() => {
        return DraxSnapbackTargetPreset.None;
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
  correct: {
    backgroundColor: "green",
  },
  incorrect: {
    backgroundColor: "red",
  },
});
