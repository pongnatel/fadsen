import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Button,
  Pressable,
} from "react-native";

import { useEffect, useState } from "react";
import initialData from "../data/initialData";
import { useCardContext } from "../context/CardContext";
import Card from "./Card";
import ColumnBoard from "./ColumnBoard";

// Define the type for a single card
interface Card {
  id: number;
  content: string;
  correctColumnId: number;
}

// Define the type for initialData which includes an array of Card objects
interface InitialData {
  cards: Card[];
}

const { height, width } = Dimensions.get("window");

export default function InitialBoard() {
  const [boardData, setBoardData] = useState<InitialData>(initialData);
  const { initialBoard, resetCards } = useCardContext();

  return (
    <View>
      <View style={styles.initialContainer}>
        {initialBoard.map((card) => (
          <Card
            key={card.id}
            cardID={card.id}
            content={card.content}
            correctColumnId={card.correctColumnId}
          />
        ))}
      </View>
      <Pressable
        style={styles.resetButton}
        onPress={() => {
          resetCards();
        }}
      >
        <Text style={styles.resetText}>Reset Button</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  initialContainer: {
    height: height * 0.25,
    borderStyle: "solid",
    borderColor: "black",
    backgroundColor: "blue",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  resetButton: {
    backgroundColor: "yellow",
    alignSelf: "center",
    padding: 10,
  },
  resetText: {
    fontSize: 40,
  },
});
