'use client'

import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import Image from 'next/image';

interface Item {
  id: number;
  image: string;
  alt: string;
}

export default function AttentionGameFour() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  const items: Item[] = [
    { id: 1, image: "/assets/games/apple.png", alt: "Алма" },
    { id: 2, image: "/assets/games/pen.png", alt: "Қалам" },
    { id: 3, image: "/assets/games/pencil.png", alt: "Қарындаш" },
    { id: 4, image: "/assets/games/car.png", alt: "Көлік" },
    { id: 5, image: "/assets/games/book.png", alt: "Кітап" },
  ];

  const [leftItems, setLeftItems] = useState<Item[]>([...items].sort(() => Math.random() - 0.5));

  const handleDragStart = (e: React.DragEvent, item: Item) => {
    e.dataTransfer.setData('itemId', item.id.toString());
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('itemId'));

    if (draggedId === targetId) {
      setMatchedPairs(prev => [...prev, targetId]);
      setLeftItems(prev => prev.filter(item => item.id !== targetId));

      if (matchedPairs.length + 1 === items.length) {
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
    setLeftItems([...items].sort(() => Math.random() - 0.5));
  };

  return (
    <GameSectionLayout 
      title="Суретті ізде" 
      backgroundImage="/assets/bg/4.jpg"
      darkHeader
    >
      <div className="flex justify-between p-6 gap-20">
        {/* Left side - draggable items */}
        <div className="flex-1 bg-white p-6 rounded-lg">
          <div className="grid grid-cols-3 gap-4">
            {leftItems.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className="w-32 h-32 border-2 rounded-lg flex items-center justify-center cursor-move"
              >
                <Image 
                  src={item.image} 
                  alt={item.alt} 
                  width={100} 
                  height={100} 
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right side - target column */}
        <div className="w-48">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`w-40 h-40 border-2 rounded-lg flex items-center justify-center 
                  ${matchedPairs.includes(item.id) ? 'opacity-0' : 'bg-white'}`}
                onDrop={(e) => handleDrop(e, item.id)}
                onDragOver={handleDragOver}
              >
                {!matchedPairs.includes(item.id) && (
                  <Image 
                    src={item.image} 
                    alt={item.alt} 
                    width={100} 
                    height={100} 
                    className="object-contain"
                  />
                )}
              </div>
            ))}
          </div>
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