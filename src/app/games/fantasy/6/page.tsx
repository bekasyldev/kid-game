'use client';
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';

interface Cell {
  letter: string;
  isSelected: boolean;
  isHighlighted: boolean;
  row: number;
  col: number;
}

export default function FantasyGameSix() {
  const GRID = [
    ['А', 'Ш', 'М', 'Е', 'К', 'Ө', 'К'], 
    ['Е', 'С', 'І', 'К', 'І', 'А', 'І'], 
    ['К', 'І', 'Т', 'А', 'Т', 'Л', 'Т'], 
    ['К', 'Ө', 'К', 'Т', 'Е', 'М', 'А'], 
    ['А', 'С', 'Ы', 'Қ', 'П', 'А', 'П'], 
    ['М', 'Ғ', 'Ж', 'Е', 'У', 'Х', 'Ы'], 
    ['К', 'І', 'Т', 'А', 'О', 'А', 'Қ'], 
  ];
  const GRID_SIZE = GRID[0].length; // Automatically adapts to the number of columns

  const words = ['АЛМА', 'КІТАП', 'ЕСІК', 'КӨКТЕМ', 'АСЫҚ'];
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [grid, setGrid] = useState<Cell[][]>(
    GRID.map((row, rowIndex) =>
      row.map((letter, colIndex) => ({
        letter,
        isSelected: false,
        isHighlighted: false,
        row: rowIndex,
        col: colIndex,
      }))
    )
  );
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  const handleCellClick = (cell: Cell) => {
    if (selectedCells.some((c) => c.row === cell.row && c.col === cell.col)) return;

    if (selectedCells.length > 0) {
      const lastCell = selectedCells[selectedCells.length - 1];
      const isAdjacent =
        (Math.abs(cell.row - lastCell.row) === 1 && cell.col === lastCell.col) ||
        (Math.abs(cell.col - lastCell.col) === 1 && cell.row === lastCell.row);

      if (!isAdjacent) return;
    }

    setSelectedCells([...selectedCells, cell]);

    const updatedGrid = grid.map((row) =>
      row.map((gridCell) =>
        gridCell.row === cell.row && gridCell.col === cell.col
          ? { ...gridCell, isSelected: true }
          : gridCell
      )
    );
    setGrid(updatedGrid);

    checkForWord([...selectedCells, cell]);
  };

  const checkForWord = (cells: Cell[]) => {
    const word = cells.map((cell) => cell.letter).join('');
    if (words.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
      highlightWord(cells);
      clearSelection();

      if (foundWords.length + 1 === words.length) {
        setSuccess(true);
        setShowModal(true);
      }
    }
  };

  const highlightWord = (cells: Cell[]) => {
    const updatedGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        isHighlighted: cells.some((selected) => selected.row === cell.row && selected.col === cell.col),
      }))
    );
    setGrid(updatedGrid);
  };

  const clearSelection = () => {
    const updatedGrid = grid.map((row) =>
      row.map((cell) => ({ ...cell, isSelected: false }))
    );
    setGrid(updatedGrid);
    setSelectedCells([]);
  };

  const restartGame = () => {
    setFoundWords([]);
    setShowModal(false);
    setGrid(
      GRID.map((row, rowIndex) =>
        row.map((letter, colIndex) => ({
          letter,
          isSelected: false,
          isHighlighted: false,
          row: rowIndex,
          col: colIndex,
        }))
      )
    );
    setSelectedCells([]);
    setSuccess(false);
  };

  return (
    <GameSectionLayout
      title="Сөзді тап"
      backgroundImage="/assets/bg/6.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center gap-6 p-6">
        {/* Grid Display */}
        <div
          className={`grid grid-cols-${GRID_SIZE} gap-1 bg-white/10 p-4 rounded-xl`}
          >
        {grid.map((row) =>
          row.map((cell) => (
            <button
              key={`${cell.row}-${cell.col}`}
              onClick={() => handleCellClick(cell)}
              className={`w-12 h-12 flex items-center justify-center rounded-lg text-xl font-bold
                ${cell.isHighlighted ? 'bg-green-500 text-white' : ''}
                ${cell.isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {cell.letter}
            </button>
                  ))
                )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={clearSelection}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-lg font-bold"
          >
            Таңдауды тазалау
          </button>
          <button
            onClick={restartGame}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-bold"
          >
            Қайта бастау
          </button>
        </div>

        {/* Words List */}
        <div className="bg-white/10 p-4 rounded-xl w-full max-w-md">
          <h2 className="text-xl font-bold text-white mb-4">Табылатын сөздер:</h2>
          <div className="flex flex-col gap-2">
            {words.map((word) => (
              <div
                key={word}
                className={`px-4 py-2 rounded-lg ${
                  foundWords.includes(word) ? 'bg-green-500 text-white' : 'bg-gray-100'
                }`}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <GameModal success={success} onRestart={restartGame} />
        </div>
      )}
    </GameSectionLayout>
  );
}