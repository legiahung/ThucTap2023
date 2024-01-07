'use client'
import './styles.css';
import React, { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button className="custom-button" onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

export default MyButton;