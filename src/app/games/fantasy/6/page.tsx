'use client'
import { useState, useEffect } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';

interface Cell {
  letter: string;
  isSelected: boolean;
  row: number;
  col: number;
}

export default function FantasyGameSix() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);  
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  // Shorter word list
  const words = ['АЛМА', 'КІТАП', 'ЕСІК', 'КӨКТЕМ', 'АСЫҚ'];
  const alphabet = 'АӘБВГҒДЕЁЖЗИЙКҚЛМНҢОӨПРСТУҰҮФХҺЦЧШЩЪЫІЬЭЮЯ'.split('');

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    // Create 6x6 grid
    const newGrid: Cell[][] = Array(6).fill(null).map((_, row) => 
      Array(6).fill(null).map((_, col) => ({
        letter: alphabet[Math.floor(Math.random() * alphabet.length)],
        isSelected: false,
        row,
        col
      }))
    );

    // Place words horizontally and vertically
    placeWords(newGrid);
    setGrid(newGrid);
  };

  const placeWords = (grid: Cell[][]) => {
    words.forEach((word, index) => {
      const isHorizontal = index % 2 === 0; // Alternate between horizontal and vertical
      const letters = word.split('');
      
      if (isHorizontal) {
        // Place horizontally
        const row = Math.floor(Math.random() * 6);
        const col = Math.floor(Math.random() * (6 - word.length + 1));
        letters.forEach((letter, i) => {
          grid[row][col + i].letter = letter;
        });
      } else {
        // Place vertically
        const row = Math.floor(Math.random() * (6 - word.length + 1));
        const col = Math.floor(Math.random() * 6);
        letters.forEach((letter, i) => {
          grid[row + i][col].letter = letter;
        });
      }
    });
  };

  const handleCellClick = (cell: Cell) => {
    if (!cell.isSelected && selectedCells.length > 0) {
      const lastCell = selectedCells[selectedCells.length - 1];
      
      // Only allow selecting in same row or column
      const sameRow = cell.row === lastCell.row;
      const sameCol = cell.col === lastCell.col;
      const isAdjacent = Math.abs(cell.row - lastCell.row) === 1 || 
                        Math.abs(cell.col - lastCell.col) === 1;

      if ((!sameRow && !sameCol) || !isAdjacent) return;
    }

    const newGrid = [...grid];
    newGrid[cell.row][cell.col].isSelected = !cell.isSelected;
    setGrid(newGrid);

    if (!cell.isSelected) {
      setSelectedCells([...selectedCells, cell]);
      checkForWord([...selectedCells, cell]);
    } else {
      setSelectedCells(selectedCells.filter(c => 
        c.row !== cell.row || c.col !== cell.col
      ));
    }
  };

  const checkForWord = (cells: Cell[]) => {
    const word = cells.map(cell => cell.letter).join('');
    if (words.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
      clearSelection();
      
      if (foundWords.length + 1 === words.length) {
        setSuccess(true);
        setShowModal(true);
      }
    }
  };

  const clearSelection = () => {
    const newGrid = grid.map(row => 
      row.map(cell => ({
        ...cell,
        isSelected: false
      }))
    );
    setGrid(newGrid);
    setSelectedCells([]);
  };

  return (
    <GameSectionLayout 
      title="Сөзді тап" 
      backgroundImage="/assets/bg/fantasy.webp"
      darkHeader
    >
      <div className="flex justify-center gap-8 p-6">
        <div className="grid grid-cols-6 gap-1 bg-white/10 p-4 rounded-xl">
          {grid.map((row, rowIndex) => 
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(cell)}
                className={`w-16 h-16 flex items-center justify-center rounded-lg text-2xl font-bold
                  ${cell.isSelected 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {cell.letter}
              </button>
            ))
          )}
        </div>

        <div className="bg-white/10 p-4 rounded-xl">
          <h2 className="text-xl font-bold text-white mb-4">Табылатын сөздер:</h2>
          <div className="flex flex-col gap-2">
            {words.map((word) => (
              <div
                key={word}
                className={`px-4 py-2 rounded-lg ${
                  foundWords.includes(word)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100'
                }`}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <GameModal success={success} onRestart={initializeGrid} />
        </div>
      )}
    </GameSectionLayout>
  );
}