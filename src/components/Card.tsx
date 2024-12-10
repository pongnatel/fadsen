import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
  Image,
} from "react-native";
import { DraxSnapbackTargetPreset, DraxView } from "react-native-drax";
import { useCardContext } from "../context/CardContext";

type CardProps = {
  cardID: number;
  content: string | null;
  correctColumnId: number;
  isCorrect?: boolean;
  image: any;
  style?: StyleProp<ViewStyle>;
};

const { height, width } = Dimensions.get("window");

const imageMap: Record<number, any> = {
  1: require("../../assets/fadsen/influencers_idol_inspired.png"),
  2: require("../../assets/fadsen/trend_seekers.png"),
  3: require("../../assets/fadsen/fomo_shoppers.png"),
  4: require("../../assets/fadsen/sale_promo_driven.png"),
  5: require("../../assets/fadsen/eco_restrained.png"),
  6: require("../../assets/fadsen/hoarding.png"),
  7: require("../../assets/fadsen/convenience_time_saving_seekers.png"),
  8: require("../../assets/fadsen/value_seekers.png"),
  9: require("../../assets/fadsen/euphoria_chasers.png"),
};

// Define the Card component
export default function Card({
  cardID,
  content,
  correctColumnId,
  style,
  image,
  isCorrect,
}: CardProps) {
  const { removeCard } = useCardContext();

  const imageSource = imageMap[cardID];

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
      {imageSource && (
        <Image
          source={imageSource} // Pass the preloaded static path
          style={{ height: 110, width: 120 }}
        />
      )}
    </DraxView>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
  },
  content: {
    fontSize: width * 0.015,
    fontWeight: "bold",
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
