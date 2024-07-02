"use client";

import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";

import counterStyles from './Counter.module.css';

export default function Counter({ className, onInput }: { className?: string, onInput: (n: number) => void }) {
  const [count, setCount] = useState(0);
  const onCountInput = (count: number) => {
    if (!count || count < 0 || Number.isNaN(count)) {
      setCount(0);
      onInput(0);
      return;
    }

    setCount(count);
    onInput(count);
  }
  const incrementCount = () => {
    onCountInput(count + 1)
  }
  const decrementCount = () => {
    setCount(count - 1);
  }

  return (
    <div className={`flex flex-col items-center ${className || ''}`}>
      <IconButton onClick={incrementCount}><AddIcon /></IconButton>
      <input className={counterStyles.input} value={count} onChange={(e) => onCountInput(Number(e.target.value))} />
      <IconButton disabled={count === 0} onClick={decrementCount}><RemoveIcon /></IconButton>
    </div>
  )
}
