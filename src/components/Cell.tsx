import React from "react";
import "./Cell.css";

import { CellTypes } from "../types";

interface CellProps {
  // Your code here
  item: CellTypes;
  indexCell: number;
  cellSelectedOne: number | null;
  cellSelectedTwo: number | null;
  setCellSelectedOne: Function;
  setCellSelectedTwo: Function;
}

const Cell: React.FC<CellProps> = ({
  item,
  indexCell,
  cellSelectedOne,
  cellSelectedTwo,
  setCellSelectedOne,
  setCellSelectedTwo,
}) => {
  // Render cell with shape and color, use CSS to style based on shape and color.
  return (
    <div
      onClick={() => {
        if (cellSelectedOne === null) {
          setCellSelectedOne(indexCell);
          return;
        }

        setCellSelectedTwo(indexCell);
      }}
      className={` ${
        indexCell === cellSelectedOne || indexCell === cellSelectedTwo
          ? "selected"
          : "no-selected"
      } child`}
    >
      <div className={`${item?.shape} ${item?.color}`} />
    </div>
  );
};

export default Cell;
