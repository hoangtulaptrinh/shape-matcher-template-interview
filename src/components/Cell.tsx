import React from "react";
import "./Cell.css";

import { CellTypes } from "../types";

interface CellProps {
  // Your code here
  item: CellTypes;
}

const Cell: React.FC<CellProps> = ({ item }) => {
  // Render cell with shape and color, use CSS to style based on shape and color.
  return (
    <div className="child">
      <div className={`${item?.shape} ${item?.color}`} />
    </div>
  );
};

export default Cell;
