"use client";

import React, { useState } from "react";
import Board from "./board";

type TBoard = Array<string | null>;

export default function Game() {
  const [boardSize, setBoardSize] = useState(3);
  const [newBoardSize, setNewBoardSize] = useState(3);

  const [history, setHistory] = useState<TBoard[]>([
    Array(boardSize * boardSize).fill(null),
  ]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const xPlaying = currentStep % 2 === 0;
  const currentBoard = history[currentStep];

  const handlePlay = (newBoard: TBoard) => {
    const newHistory = [...history.slice(0, currentStep + 1), newBoard];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const jumpTo = (newStep: number) => setCurrentStep(newStep);

  const createNewBoard = () => {
    const newArray = Array(newBoardSize * newBoardSize).fill(null);
    setHistory([newArray]);
    setCurrentStep(0);
    setBoardSize(newBoardSize);
  };

  const moves = history.map((board, step) => (
    <li key={step}>
      <button
        className="text-red-500 hover:underline"
        onClick={() => jumpTo(step)}
      >
        {step > 0 ? `Go to move #${step}` : "Go to game start"}
      </button>
    </li>
  ));

  return (
    <div className="game flex justify-center items-center h-screen">
      <div className="board">
        <label>
          Board size:
          <input
            type="number"
            value={newBoardSize}
            onChange={(e) => setNewBoardSize(parseInt(e.target.value))}
          />
        </label>
        <button onClick={createNewBoard} className="border border-red-600 p-2 rounded hover:bg-red-600 hover:text-white focus:outline-none focus:ring focus:border-red-300">
          Create New Board
        </button>
        <Board
          xPlaying={xPlaying}
          oBoard={currentBoard}
          onPlay={handlePlay}
          size={boardSize}
        />
      </div>
      <div className="game-info ml-8 border border-red-600 p-2 rounded">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
