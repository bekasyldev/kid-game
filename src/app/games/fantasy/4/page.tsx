'use client'
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import Image from 'next/image';

interface ImagePiece {
  id: number;
  mainImage: string;
  pieceImage: string;
  alt: string;
}

export default function FantasyGameFour() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  const imagePieces: ImagePiece[] = [
    { 
      id: 1, 
      mainImage: '/big_1.png',
      pieceImage: '/small_1.png',
      alt: 'Үй'
    },
    { 
      id: 2, 
      mainImage: '/big_2.png',
      pieceImage: '/small_2.png',
      alt: 'Ағаш'
    },
    { 
      id: 3, 
      mainImage: '/big_3.png',
      pieceImage: '/small_3.png',
      alt: 'Көлік'
    },
    { 
      id: 4, 
      mainImage: '/big_4.png',
      pieceImage: '/small_4.png',
      alt: 'Гүл'
    },
  ];

  const [availablePieces, setAvailablePieces] = useState(
    [...imagePieces].sort(() => Math.random() - 0.5)
  );

  const handleDragStart = (e: React.DragEvent, pieceId: number) => {
    e.dataTransfer.setData('pieceId', pieceId.toString());
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    const pieceId = parseInt(e.dataTransfer.getData('pieceId'));
    
    if (pieceId === targetId) {
      setMatchedPairs(prev => [...prev, targetId]);
      setAvailablePieces(prev => prev.filter(piece => piece.id !== pieceId));

      if (matchedPairs.length + 1 === imagePieces.length) {
        setSuccess(true);
        setShowModal(true);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setMatchedPairs([]);
    setAvailablePieces([...imagePieces].sort(() => Math.random() - 0.5));
  };

  return (
    <GameSectionLayout 
      title="Суреттердің бөліктерін табыңыз" 
      backgroundImage="/assets/bg/4.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        {/* Main images */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {imagePieces.map((piece) => (
            <div
              key={piece.id}
              onDrop={(e) => handleDrop(e, piece.id)}
              onDragOver={handleDragOver}
              className={`relative w-48 h-48 bg-white rounded-lg p-4 flex items-center justify-center
                ${matchedPairs.includes(piece.id) ? 'bg-green-100' : ''}`}
            >
              <Image 
                src={piece.mainImage} 
                alt={piece.alt}
                width={160}
                height={160}
                className="object-contain"
              />
              {!matchedPairs.includes(piece.id) && (
                <div className="absolute inset-0 bg-gray-200/50 flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-dashed border-gray-400 rounded"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Puzzle pieces */}
        <div className="flex gap-4">
          {availablePieces.map((piece) => (
            <div
              key={piece.id}
              draggable
              onDragStart={(e) => handleDragStart(e, piece.id)}
              className="w-32 h-32 bg-white rounded-lg p-4 flex items-center justify-center cursor-move hover:shadow-lg transition-shadow"
            >
              <Image 
                src={piece.pieceImage}
                alt={piece.alt}
                width={100}
                height={100}
                className="object-contain"
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
