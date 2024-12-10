import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Button,
  Pressable,
  Image,
} from "react-native";

import { useEffect, useState } from "react";
import initialData from "../data/initialData";
import { useCardContext } from "../context/CardContext";
import Card from "./Card";
import ColumnBoard from "./ColumnBoard";
import { DraxSnapbackTargetPreset, DraxView } from "react-native-drax";

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
            image={card.image}
            correctColumnId={card.correctColumnId}
          />
        ))}
        {/* <DraxView
          onDragStart={(arg) => {}}
          onDragEnd={(arg) => {
            return DraxSnapbackTargetPreset.None;
          }}
          onDragDrop={(arg) => {}}
          onReceiveDragDrop={() => {
            return DraxSnapbackTargetPreset.None;
          }}
        >
          <Image
            source={require("../../assets/fadsen/hoarding.png")}
            style={{ height: 120, aspectRatio: 1 }}
          />
        </DraxView> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  initialContainer: {
    height: height * 0.3,
    paddingHorizontal: 200,
    columnGap: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
