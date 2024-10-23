import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import initialData from "../data/initialData";

// Card interface definition
interface Card {
  id: number;
  content: string;
  correctColumnId: number;
  currentColumnId?: number;
  isCorrect?: boolean;
}

interface ColumnData {
  columnId: number; // Added to identify the column
  columnTitle: string;
  cards: Card[];
}

// CardContextType interface definition
interface CardContextType {
  initialBoard: Card[]; // Holds the initial state of all cards
  columns: ColumnData[]; // Holds data for each column
  removeCard: (cardId: number) => void;
  resetCards: () => void; // Function to reset cards
  //   checkCardPlacements: () => void; // Function to check placements
  handleSubmit: () => void;
  updateCardColumn: (cardId: number, columnId: number) => void; // Function to update card's column
  isWin: boolean;
  setIsWin: (isWin: boolean) => void;
}

// Creating the context
const CardContext = createContext<CardContextType | undefined>(undefined);

interface CardProviderProps {
  children: ReactNode; // Add this to accept children
}

// Create a provider component
export const CardProvider: React.FC<CardProviderProps> = ({ children }) => {
  // Columns data
  const initialColumns: ColumnData[] = [
    {
      columnId: 1,
      cards: [],
      columnTitle: "Emotional",
    },
    {
      columnId: 2,
      cards: [],
      columnTitle: "Economical",
    },
    {
      columnId: 3,
      cards: [],
      columnTitle: "Eco-conscious",
    },
  ];

  const [initialBoard, setInitialBoard] = useState<Card[]>(initialData.cards);
  const [columns, setColumns] = useState<ColumnData[]>(initialColumns);
  const [isWin, setIsWin] = useState(false);
  const areAllCardsCorrect = (columns: ColumnData[]): boolean => {
    // Loop through each column
    return columns.every((column) =>
      // Check if all cards in the column are correct
      column.cards.every((card) => card.isCorrect)
    );
  };

  // Function to add a new card
  const addCard = (newCard: Card) => {
    setInitialBoard((prevCards) => [...prevCards, newCard]);
  };

  // Function to remove a card by its ID
  const removeCard = (cardId: number) => {
    setInitialBoard((prevCards) =>
      prevCards.filter((card) => card.id !== cardId)
    );
  };

  // Function to reset the card state
  const resetCards = () => {
    setInitialBoard(initialData.cards); // Reset to an empty array (or you can set a default value here)
    setColumns(initialColumns);
    setIsWin(false);
    console.log("Reset");
  };

  // Function to update the column of a card
  const updateCardColumn = (cardId: number, columnId: number) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.columnId === columnId) {
          // Add card to the column if not already present
          const cardExists = column.cards.find((card) => card.id === cardId);
          if (!cardExists) {
            const cardToAdd = initialData.cards.find(
              (card) => card.id === cardId
            );
            if (cardToAdd) {
              return {
                ...column,
                cards: [
                  ...column.cards,
                  { ...cardToAdd, currentColumnId: columnId },
                ],
              };
            }
          }
        }
        // Remove card from other columns
        return {
          ...column,
          cards: column.cards.filter((card) => card.id !== cardId),
        };
      })
    );
  };

  const handleSubmit = () => {
    console.log("Submit");
    let updatedColumns = columns.map((col) => {
      // Update each card in the column
      const updatedCards = col.cards.map((card) => {
        if (card.currentColumnId !== card.correctColumnId) {
          // Return the modified card with 'isCorrect: false'
          return { ...card, isCorrect: false };
        } else {
          // Return the card with 'isCorrect: true'
          return { ...card, isCorrect: true };
        }
      });

      // Return the updated column with the new card array
      return { ...col, cards: updatedCards };
    });

    // Now you can use updatedColumns to update your state
    setColumns(updatedColumns);

    if (initialBoard.length != 0) return;
    const allCorrect = areAllCardsCorrect(updatedColumns);
    console.log(allCorrect);
    setIsWin(allCorrect);
  };

  return (
    <CardContext.Provider
      value={{
        initialBoard,
        columns,
        resetCards,
        updateCardColumn,
        removeCard,
        handleSubmit,
        isWin,
        setIsWin,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

// Custom hook to use the CardContext in any component
export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
};
