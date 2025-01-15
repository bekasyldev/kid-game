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

export default function AttentionGameOne() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [puzzles] = useState<WordPuzzle[]>([
    { id: 1, image: '/assets/games/horse.png', word: 'Жылқы', alt: 'Қой' },
    { id: 2, image: '/new/rabbit.jpeg', word: 'Қоян', alt: 'Қоян' },
    { id: 3, image: '/new/camel.jpeg', word: 'Түйе', alt: 'Түйе' },
    { id: 4, image: '/new/fox.jpeg', word: 'Түлкі', alt: 'Түлкі' },
  ]);
  const [scrambledLetters, setScrambledLetters] = useState<{ [key: number]: string[] }>({});
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string[] }>({});
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);

  useEffect(() => {
    // Initialize scrambled letters for each puzzle
    const initialScrambled: { [key: number]: string[] } = {};
    puzzles.forEach(puzzle => {
      initialScrambled[puzzle.id] = puzzle.word.split('').sort(() => Math.random() - 0.5);
    });
    setScrambledLetters(initialScrambled);
    
    // Initialize empty user answers
    const initialAnswers: { [key: number]: string[] } = {};
    puzzles.forEach(puzzle => {
      initialAnswers[puzzle.id] = Array(puzzle.word.length).fill('');
    });
    setUserAnswers(initialAnswers);
  }, [puzzles]);

  const handleDragStart = (e: React.DragEvent, letter: string, puzzleId: number) => {
    e.dataTransfer.setData('letter', letter);
    e.dataTransfer.setData('puzzleId', puzzleId.toString());
  };

  const handleDrop = (e: React.DragEvent, index: number, puzzleId: number) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData('letter');
    const sourcePuzzleId = parseInt(e.dataTransfer.getData('puzzleId'));

    if (sourcePuzzleId !== puzzleId) return;

    const newAnswers = { ...userAnswers };
    newAnswers[puzzleId][index] = letter;
    setUserAnswers(newAnswers);

    // Check if word is complete and correct
    const currentWord = newAnswers[puzzleId].join('');
    const puzzle = puzzles.find(p => p.id === puzzleId);
    
    if (currentWord === puzzle?.word && !correctAnswers.includes(puzzleId)) {
      setCorrectAnswers(prev => [...prev, puzzleId]);
      
      // Check if all puzzles are solved
      if (correctAnswers.length === puzzles.length - 1) {
        setTimeout(() => {
          setSuccess(true);
          setShowModal(true);
        }, 500);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setCorrectAnswers([]);
    
    // Reset scrambled letters
    const newScrambled: { [key: number]: string[] } = {};
    puzzles.forEach(puzzle => {
      newScrambled[puzzle.id] = puzzle.word.split('').sort(() => Math.random() - 0.5);
    });
    setScrambledLetters(newScrambled);
    
    // Reset user answers
    const newAnswers: { [key: number]: string[] } = {};
    puzzles.forEach(puzzle => {
      newAnswers[puzzle.id] = Array(puzzle.word.length).fill('');
    });
    setUserAnswers(newAnswers);
  };

  return (
    <GameSectionLayout 
      title="Әріптерден суреттің сөзін құра" 
      backgroundImage="/assets/bg/memory.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6 gap-8">
        {puzzles.map((puzzle) => (
          <div 
            key={puzzle.id}
            className={`flex flex-col items-center gap-4 p-6 rounded-xl transition-all
              ${correctAnswers.includes(puzzle.id) ? 'bg-green-100' : ''}`}
          >
            {/* Image */}
            <div className="w-48 h-48 bg-white rounded-lg p-4 flex items-center justify-center">
              <Image 
                src={puzzle.image}
                alt={puzzle.alt}
                width={160}
                height={160}
                className="object-contain"
              />
            </div>

            {/* Letter slots */}
            <div className="flex gap-2">
              {puzzle.word.split('').map((_, index) => (
                <div
                  key={index}
                  onDrop={(e) => handleDrop(e, index, puzzle.id)}
                  onDragOver={handleDragOver}
                  className="w-12 h-12 border-2 rounded-lg flex items-center justify-center bg-white text-2xl font-bold"
                >
                  {userAnswers[puzzle.id]?.[index]}
                </div>
              ))}
            </div>

            {/* Scrambled letters */}
            <div className="flex gap-2">
              {scrambledLetters[puzzle.id]?.map((letter, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, letter, puzzle.id)}
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