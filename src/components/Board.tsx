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
  const [boardsDone, setBoardsDone] = useState<Array<number>>(Array(16));
  const [cellSelectedOne, setCellSelectedOne] = useState<number | null>(null);
  const [cellSelectedTwo, setCellSelectedTwo] = useState<number | null>(null);

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

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      console.log("1 second has passed");
      if (cellSelectedOne === null || cellSelectedTwo === null) return;

      if (
        boards[cellSelectedOne].shape !== boards[cellSelectedTwo].shape ||
        boards[cellSelectedOne].color !== boards[cellSelectedTwo].color
      ) {
        setCellSelectedOne(null);
        setCellSelectedTwo(null);
      } else {
        setCellSelectedOne(null);
        setCellSelectedTwo(null);
        setBoardsDone([...boardsDone, cellSelectedOne, cellSelectedTwo]);
      }
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [cellSelectedOne, cellSelectedTwo]); // Pass in empty array to run useEffect only on mount.

  console.log("boardsDone", boardsDone);

  const isWin =
    boardsDone.filter((item) => typeof item === "number").length === 16;

  return (
    <div className="board">
      {/* Render each cell in the board */}

      <div className={`grid ${isWin ? "win" : ""}`}>
        <>
          {isWin
            ? "You Win"
            : boards.map((item: CellTypes, index: number) => (
                <Cell
                  item={item}
                  indexCell={index}
                  cellSelectedOne={cellSelectedOne}
                  cellSelectedTwo={cellSelectedTwo}
                  setCellSelectedOne={setCellSelectedOne}
                  setCellSelectedTwo={setCellSelectedTwo}
                  boardsDone={boardsDone}
                />
              ))}
        </>
      </div>
    </div>
  );
};

export default Board;
