/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState, useEffect } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import Image from 'next/image';

interface WordPuzzle {
  id: number;
  image: string;
  word: string;
  alt: string;
}

export default function MemoryGameFive() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [puzzles] = useState<WordPuzzle[]>([
    { id: 1, image: '/assets/games/bee_4.png', word: 'АРА', alt: 'Ара' },
    { id: 2, image: '/assets/games/clock.png', word: 'САҒАТ', alt: 'Сағат' },
    { id: 3, image: '/assets/games/fish.png', word: 'БАЛЫҚ', alt: 'Балық' },
    { id: 4, image: '/assets/games/horse.png', word: 'ЖЫЛҚЫ', alt: 'Жылқы' },
  ]);
  
  const [scrambledLetters, setScrambledLetters] = useState<{ [key: number]: string[] }>({});
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string[] }>({});
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const initialScrambled: { [key: number]: string[] } = {};
    const initialAnswers: { [key: number]: string[] } = {};
    
    puzzles.forEach(puzzle => {
      initialScrambled[puzzle.id] = puzzle.word.split('').sort(() => Math.random() - 0.5);
      initialAnswers[puzzle.id] = Array(puzzle.word.length).fill('');
    });
    
    setScrambledLetters(initialScrambled);
    setUserAnswers(initialAnswers);
    setCorrectAnswers([]);
  };

  const handleDragStart = (e: React.DragEvent, letter: string, puzzleId: number, letterIndex: number) => {
    e.dataTransfer.setData('letter', letter);
    e.dataTransfer.setData('puzzleId', puzzleId.toString());
    e.dataTransfer.setData('letterIndex', letterIndex.toString());
  };

  const handleDrop = (e: React.DragEvent, index: number, puzzleId: number) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData('letter');
    const sourcePuzzleId = parseInt(e.dataTransfer.getData('puzzleId'));
    const letterIndex = parseInt(e.dataTransfer.getData('letterIndex'));

    if (sourcePuzzleId !== puzzleId) return;

    // Update user answers
    const newAnswers = { ...userAnswers };
    newAnswers[puzzleId][index] = letter;
    setUserAnswers(newAnswers);

    // Remove letter from scrambled letters
    const newScrambled = { ...scrambledLetters };
    newScrambled[puzzleId] = newScrambled[puzzleId].filter((_, idx) => idx !== letterIndex);
    setScrambledLetters(newScrambled);

    // Check if word is complete
    const currentWord = newAnswers[puzzleId].join('');
    const puzzle = puzzles.find(p => p.id === puzzleId);
    
    if (currentWord === puzzle?.word && !correctAnswers.includes(puzzleId)) {
      const newCorrectAnswers = [...correctAnswers, puzzleId];
      setCorrectAnswers(newCorrectAnswers);
      
      // Check if all puzzles are solved
      if (newCorrectAnswers.length === puzzles.length) {
        setTimeout(() => {
          setSuccess(true);
          setShowModal(true);
        }, 500);
      }
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    initializeGame();
  };

  return (
    <GameSectionLayout 
      title="Әріптерден суреттің сөзін құра" 
      backgroundImage="/assets/bg/5.jpg"
      darkHeader
    >
      <div className="flex items-center justify-center p-6 gap-8">
        {puzzles.map((puzzle) => (
          <div 
            key={puzzle.id}
            className={`flex flex-col items-center gap-4 p-6 rounded-xl transition-all
              ${correctAnswers.includes(puzzle.id) ? 'bg-green-100' : ''}`}
          >
            <div className="w-48 h-48 bg-white rounded-lg p-4 flex items-center justify-center">
              <Image 
                src={puzzle.image}
                alt={puzzle.alt}
                width={160}
                height={160}
                className="object-contain"
              />
            </div>

            <div className="flex gap-2">
              {puzzle.word.split('').map((_, index) => (
                <div
                  key={index}
                  onDrop={(e) => handleDrop(e, index, puzzle.id)}
                  onDragOver={(e) => e.preventDefault()}
                  className="w-12 h-12 border-2 rounded-lg flex items-center justify-center bg-white text-2xl font-bold"
                >
                  {userAnswers[puzzle.id]?.[index]}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              {scrambledLetters[puzzle.id]?.map((letter, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, letter, puzzle.id, index)}
                  className="w-12 h-12 border-2 rounded-lg flex items-center justify-center bg-white text-2xl font-bold cursor-move hover:bg-blue-50"
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <GameModal success={success} onRestart={handleRestart} />
        </div>
      )}
    </GameSectionLayout>
  );
}