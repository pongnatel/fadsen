import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { DraxSnapbackTargetPreset, DraxView } from "react-native-drax";
import Card from "./Card";
import { useCardContext } from "../context/CardContext";
import { panGestureHandlerCustomNativeProps } from "react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler";

// Define the type for a single card
interface Card {
  id: number;
  content: string;
  correctColumnId: number;
  image: any;
  isCorrect?: boolean;
}

type ColumnProp = {
  columnId: number;
  name: string;
  cards: Card[];
};

const { height, width } = Dimensions.get("window");

const columnMap: Record<number, any> = {
  1: require("../../assets/fadsen/locker_emotional.png"),
  2: require("../../assets/fadsen/locker_economical.png"),
  3: require("../../assets/fadsen/locker_eco_conscious.png"),
};

export default function Column({ columnId, cards }: ColumnProp) {
  const [isDragOver, setIsDragOver] = useState(false);
  const { updateCardColumn, removeCard } = useCardContext();

  const imageSource = columnMap[columnId];

  return (
    <ImageBackground
      style={[styles.container, isDragOver && styles.dragOver]}
      source={imageSource}
      resizeMode="contain"
    >
      <DraxView
        style={[styles.contentContainer]}
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
            image={card.image}
            isCorrect={card.isCorrect}
          />
        ))}
      </DraxView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.23,
    height: height * 0.45,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    paddingTop: "20%",
    justifyContent: "space-evenly",
  },
  columnCard: {
    height: 110,
    width: 120,
  },
  dragOver: {
    opacity: 0.7,
  },
});
