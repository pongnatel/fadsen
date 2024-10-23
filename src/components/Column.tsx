import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { DraxSnapbackTargetPreset, DraxView } from "react-native-drax";
import Card from "./Card";
import { useCardContext } from "../context/CardContext";
import { panGestureHandlerCustomNativeProps } from "react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler";

// Define the type for a single card
interface Card {
  id: number;
  content: string;
  correctColumnId: number;
  isCorrect?: boolean;
}

type ColumnProp = {
  columnId: number;
  name: string;
  cards: Card[];
};

const { height, width } = Dimensions.get("window");

export default function Column({ columnId, name, cards }: ColumnProp) {
  const [isDragOver, setIsDragOver] = useState(false);
  const { updateCardColumn, removeCard } = useCardContext();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <DraxView
        style={[styles.contentContainer, isDragOver && styles.dragOver]}
        onReceiveDragOver={() => {
          setIsDragOver(true);
        }}
        onReceiveDragExit={() => {
          setIsDragOver(false); // Revert color when drag leaves
        }}
        onReceiveDragDrop={({ dragged: { payload } }) => {
          const cardExists = cards.some((card) => card.id === payload.cardID);
          if (cardExists) {
            setIsDragOver(false);
            return DraxSnapbackTargetPreset.None;
          }
          removeCard(payload.cardID);
          updateCardColumn(payload.cardID, columnId);
          setIsDragOver(false);
          console.log(payload);
          return DraxSnapbackTargetPreset.None;
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            cardID={card.id}
            content={card.content}
            correctColumnId={card.correctColumnId}
            style={styles.columnCard}
            isCorrect={card.isCorrect}
          />
        ))}
      </DraxView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.3,
    minHeight: height * 0.4,
    flexDirection: "column",
    borderWidth: 10, // Set the border width
    borderTopWidth: 0,
    borderColor: "#232323", // Set the border color
  },
  titleContainer: {
    height: 100,
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    backgroundColor: "#232323",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#13AD82",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#E2E1E0",
    gap: 10,
    paddingTop: 10,
  },
  columnCard: {
    marginHorizontal: 10,
    marginVertical: 0,
    width: "auto",
  },
  dragOver: {
    backgroundColor: "#87CEEB", // Color during drag over
  },
});
