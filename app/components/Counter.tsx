"use client";

import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from "react";

import counterStyles from './Counter.module.css';

export default function Counter({ className, count: propsCount, onInput }: { className?: string, count: number, onInput: (n: number) => void }) {
  const [count, setCount] = useState(propsCount || 0);
  useEffect(() => {
    setCount(propsCount);
  }, [propsCount]);

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
    console.log('increment', count + 1);
    onCountInput(count + 1)
  }
  const decrementCount = () => {
    onCountInput(count - 1)
  }

  return (
    <div className={`flex flex-col items-center ${className || ''}`}>
      <IconButton onClick={incrementCount}><AddIcon /></IconButton>
      <input className={counterStyles.input} value={count} onChange={(e) => onCountInput(Number(e.target.value))} />
      <IconButton disabled={count === 0} onClick={decrementCount}><RemoveIcon /></IconButton>
    </div>
  )
}
