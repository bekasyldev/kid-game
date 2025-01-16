'use client'

import { useState, useEffect } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import Image from 'next/image';

interface PicturePuzzle {
  id: number;
  mainImage: string;
  pieceImage: string;
  alt: string;
}

export default function AttentionGameOne() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [correctMatches, setCorrectMatches] = useState<number[]>([]);
  const [shuffledPieces, setShuffledPieces] = useState<PicturePuzzle[]>([]);

  const puzzles: PicturePuzzle[] = [
    { 
      id: 1, 
      mainImage: '/assets/games/apple.png', 
      pieceImage: '/assets/games/half-apple.jpg',
      alt: 'Алма' 
    },
    { 
      id: 2, 
      mainImage: '/assets/games/strawberry.png', 
      pieceImage: '/assets/games/half-strawberry.jpg',
      alt: 'Ойыншық' 
    },
    { 
      id: 3, 
      mainImage: '/assets/games/banana.png', 
      pieceImage: '/assets/games/half-banana.jpg',
      alt: 'Банана' 
    },
    { 
      id: 4, 
      mainImage: '/assets/games/orange.jpg', 
      pieceImage: '/assets/games/half-orange.jpg',
      alt: 'Қолшатыр' 
    },
  ];

  useEffect(() => {
    // Shuffle the pieces at start
    setShuffledPieces([...puzzles].sort(() => Math.random() - 0.5));
  }, []);

  const handleDragStart = (e: React.DragEvent, piece: PicturePuzzle) => {
    e.dataTransfer.setData('pieceId', piece.id.toString());
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    const pieceId = parseInt(e.dataTransfer.getData('pieceId'));

    if (pieceId === targetId && !correctMatches.includes(targetId)) {
      setCorrectMatches(prev => [...prev, targetId]);

      if (correctMatches.length === puzzles.length - 1) {
        setTimeout(() => {
          setSuccess(true);
          setShowModal(true);
        }, 500);
      }
    } else {
      // Add shake animation for incorrect match
      const element = document.getElementById(`puzzle-${targetId}`);
      element?.classList.add('shake');
      setTimeout(() => {
        element?.classList.remove('shake');
      }, 500);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setCorrectMatches([]);
    setShuffledPieces([...puzzles].sort(() => Math.random() - 0.5));
  };

  return (
    <GameSectionLayout 
      title="Бөліктерін тап" 
      backgroundImage="/assets/bg/7.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6 gap-12">
        {/* Main pictures row */}
        <div className="grid grid-cols-4 gap-8">
          {puzzles.map((puzzle) => (
            <div
              key={puzzle.id}
              id={`puzzle-${puzzle.id}`}
              className={`relative w-48 h-48 bg-white rounded-lg p-4 transition-all
                ${correctMatches.includes(puzzle.id) ? 'bg-green-100' : ''}`}
              onDrop={(e) => handleDrop(e, puzzle.id)}
              onDragOver={handleDragOver}
            >
              <Image 
                src={puzzle.mainImage}
                alt={puzzle.alt}
                width={160}
                height={160}
                className="object-contain"
              />
              {correctMatches.includes(puzzle.id) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src={puzzle.pieceImage}
                    alt={`${puzzle.alt} piece`}
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pieces row */}
        <div className="grid grid-cols-4 gap-8">
          {shuffledPieces.map((piece) => (
            <div
              key={piece.id}
              draggable={!correctMatches.includes(piece.id)}
              onDragStart={(e) => handleDragStart(e, piece)}
              className={`w-48 h-48 bg-white rounded-lg p-4 cursor-move transition-all
                ${correctMatches.includes(piece.id) ? 'opacity-50' : 'hover:shadow-lg'}
                ${correctMatches.includes(piece.id) ? 'cursor-default' : 'cursor-move'}`}
            >
              <Image 
                src={piece.pieceImage}
                alt={`${piece.alt} piece`}
                width={160}
                height={160}
              />
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <GameModal success={success} onRestart={handleRestart} />
        </div>
      )}

    </GameSectionLayout>
  );
}