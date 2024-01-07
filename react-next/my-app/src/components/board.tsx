"use client";

import React from "react";

type TBoard = Array<string | null>;

const getWin = (size: number): number[][] => {
  const combinations: number[][] = [];

  // Horizontal
  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= size - 3; j++) {
      combinations.push(
        Array.from({ length: 3 }, (_, index) => i * size + j + index)
      );
    }
  }

  // Vertical
  for (let i = 0; i <= size - 3; i++) {
    for (let j = 0; j < size; j++) {
      combinations.push(
        Array.from({ length: 3 }, (_, index) => (i + index) * size + j)
      );
    }
  }

  // Diagonal (left to right)
  for (let i = 0; i <= size - 3; i++) {
    for (let j = 0; j <= size - 3; j++) {
      combinations.push(
        Array.from({ length: 3 }, (_, index) => (i + index) * size + j + index)
      );
    }
  }

  // Diagonal (right to left)
  for (let i = 0; i <= size - 3; i++) {
    for (let j = size - 1; j >= 2; j--) {
      combinations.push(
        Array.from({ length: 3 }, (_, index) => (i + index) * size + j - index)
      );
    }
  }

  return combinations;
};

const checkWin = (board: TBoard, size: number): string | null => {
  const Win = getWin(size);

  for (let i = 0; i < Win.length; i++) {
    const [a, b, c] = Win[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as string;
    }
  }

  return null;
};

interface OXProps {
  value: string | null;
  onClick: () => void;
}

function OX({ value, onClick }: OXProps) {
  return (
    <button className="border border-gray-400 p-4" onClick={onClick}>
      {value}
    </button>
  );
}

interface BoardProps {
  xPlaying: boolean;
  oBoard: TBoard;
  onPlay: (newOBoard: TBoard) => void;
  size: number;
}

function Board({ xPlaying, oBoard, onPlay, size }: BoardProps) {
  function handleClick(i: number) {
    if (oBoard[i] || checkWin(oBoard, size)) return;
    const newOBoard = oBoard.slice();
    newOBoard[i] = xPlaying ? 'X' : 'O';
    onPlay(newOBoard);
  }

  const winner = checkWin(oBoard, size);
  const isFull = oBoard.every((value) => value !== null);
  let status;

  if (winner) {
    status = 'Winner: ' + winner;
  } else if (isFull) {
    status = 'Draw! Restart the game.';
  } else {
    status = 'Next player: ' + (xPlaying ? 'X' : 'O');
  }

  return (
    <div className="board">
      <div className="status mb-4">{status}</div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {oBoard.map((value, index) => (
          <OX key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
    </div>
  );
}

export default Board;
