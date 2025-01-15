'use client'
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import Image from 'next/image';

interface Pattern {
  id: number;
  sequence: string[];
  answer: string;
}

export default function ThinkingGameFive() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [completedPatterns, setCompletedPatterns] = useState<number[]>([]);

  const patterns: Pattern[] = [
    {
      id: 1,
      sequence: ['/assets/games/car.png', '/assets/games/tree.png', '/assets/games/car.png'],
      answer: '/assets/games/tree.png'
    },
    {
      id: 2,
      sequence: ['/assets/games/apple.png', '/assets/games/banana.png', '/assets/games/apple.png'],
      answer: '/assets/games/banana.png'
    },
    {
      id: 3,
      sequence: ['/assets/games/bird.png', '/assets/games/camel.png', '/assets/games/bird.png'],
      answer: '/assets/games/bird.png'
    },
    {
      id: 4,
      sequence: ['/assets/games/duck.png', '/assets/games/camel.png', '/assets/games/duck.png'],
      answer: '/assets/games/duck.png'
    },
    {
      id: 5,
      sequence: ['/assets/games/bird.png', '/assets/games/fox.png', '/assets/games/bird.png'],
      answer: '/assets/games/bird.png'
    }
  ];

  const handleDragStart = (e: React.DragEvent, image: string) => {
    e.dataTransfer.setData('image', image);
  };

  const handleDrop = (e: React.DragEvent, patternId: number, correctAnswer: string) => {
    e.preventDefault();
    const draggedImage = e.dataTransfer.getData('image');

    if (draggedImage === correctAnswer) {
      setCompletedPatterns(prev => [...prev, patternId]);
      
      if (completedPatterns.length + 1 === patterns.length) {
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
    setCompletedPatterns([]);
  };

  return (
    <GameSectionLayout 
      title="Ойлан, тап" 
      backgroundImage="/assets/bg/thinking.webp"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        {/* Pattern sequences */}
        <div className="space-y-8">
          {patterns.map((pattern) => (
            <div key={pattern.id} className="flex items-center gap-4">
              {pattern.sequence.map((image, index) => (
                <div key={index} className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
                  <Image src={image} alt="" width={80} height={80} className="object-contain" />
                </div>
              ))}
              <div
                className={`w-24 h-24 border-2 rounded-lg flex items-center justify-center 
                  ${completedPatterns.includes(pattern.id) ? 'bg-white' : 'border-dashed'}`}
                onDrop={(e) => handleDrop(e, pattern.id, pattern.answer)}
                onDragOver={handleDragOver}
              >
                {completedPatterns.includes(pattern.id) && (
                  <Image src={pattern.answer} alt="" width={80} height={80} className="object-contain" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Available options */}
        <div className="mt-8 flex gap-4">
          {patterns.map((pattern) => (
            <div
              key={pattern.id}
              draggable
              onDragStart={(e) => handleDragStart(e, pattern.answer)}
              className="w-24 h-24 bg-white rounded-lg flex items-center justify-center cursor-move"
            >
              <Image src={pattern.answer} alt="" width={80} height={80} className="object-contain" />
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
