import React, { createContext, useState, useContext, ReactNode } from "react";
import initialData from "../data/initialData";

// Card interface definition
interface Card {
  id: number;
  content: string;
  correctColumnId: number;
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
  updateCardColumn: (cardId: number, columnId: number) => void; // Function to update card's column
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

  return (
    <CardContext.Provider
      value={{
        initialBoard,
        columns,
        resetCards,
        updateCardColumn,
        removeCard,
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
