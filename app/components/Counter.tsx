"use client";

import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";

export default function Counter({ className }: { className?: string }) {
  const [count, setCount] = useState(0);
  const incrementCount = () => {
    setCount(count + 1);
  }
  const decrementCount = () => {
    if (count === 0) {
      return;
    }

    setCount(count - 1);
  }

  return (
    <div className={`flex flex-col items-center ${className || ''}`}>
      <IconButton onClick={incrementCount}><AddIcon /></IconButton>
      {count}
      <IconButton disabled={count === 0} onClick={decrementCount}><RemoveIcon /></IconButton>
    </div>
  )
}
