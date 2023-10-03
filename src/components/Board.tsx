import React, { useState, useEffect } from "react";

import Cell from "./Cell";

import { CellTypes } from "../types";

import "./Board.css";

const SHAPES = ["circle", "square", "triangle"];
const COLORS = ["red", "green", "blue"];

function getRandomInt(underIndex: number) {
  return Math.floor(Math.random() * underIndex);
}

function shuffle(array: Array<CellTypes>) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const Board: React.FC = () => {
  // states...
  const [boards, setBoards] = useState<Array<CellTypes>>(Array(16));
  const [currentStatus, setCurrentStatus] = useState<CellTypes>({
    shape: "circle",
    color: "red",
  });

  useEffect(() => {
    // Initialize the game board with random shapes and colors
    const generateRandomOneShapeColorCell = () => ({
      shape: SHAPES[getRandomInt(3)],
      color: COLORS[getRandomInt(3)],
    });

    const randomEightShapeColorCell = [];

    for (let i = 0; i < 8; i++) {
      randomEightShapeColorCell.push(generateRandomOneShapeColorCell());
    }

    const randomSixTeenShapeColorCell = [
      ...randomEightShapeColorCell,
      ...randomEightShapeColorCell,
    ];

    const shuffleRandomSixTeenShapeColorCell = shuffle(
      randomSixTeenShapeColorCell
    );

    setBoards(shuffleRandomSixTeenShapeColorCell);
  }, []);

  const handleCellClick = (index: number) => {
    // Reveal cell, check for matches, update game state, and handle game completion
  };

  return (
    <div className="board">
      {/* Render each cell in the board */}
      <div className="grid">
        {boards.map((item: CellTypes) => (
          <Cell item={item} />
        ))}
      </div>
    </div>
  );
};

export default Board;
