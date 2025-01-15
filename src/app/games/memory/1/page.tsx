'use client'
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import Image from 'next/image';
import GameModal from '@/app/components/GameModal';

interface GameItem {
  id: number;
  image: string;
  alt: string;
  isHidden?: boolean;
}

export default function MemoryGameOne() {
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [items, setItems] = useState<GameItem[]>([
    { id: 1, image: "/assets/games/apple.png", alt: "Алма" },
    { id: 2, image: "/assets/games/banana.png", alt: "Банан" },
    { id: 3, image: "/assets/games/broccoli.png", alt: "Брокколи" },
    { id: 4, image: "/assets/games/dog.png", alt: "Ит" },
    { id: 5, image: "/assets/games/strawberry.png", alt: "Құлпынай" },
    { id: 6, image: "/assets/games/car.png", alt: "Көлік" },
    { id: 7, image: "/assets/games/book.png", alt: "Кітап" },
    { id: 8, image: "/assets/games/eggplant.png", alt: "Баялды" },
  ]);
  const [draggedItems, setDraggedItems] = useState<GameItem[]>([]);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    let timer = 5;
    const countdownInterval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);
      if (timer === 0) {
        clearInterval(countdownInterval);
        hideRandomItems();
      }
    }, 1000);
  };

  const hideRandomItems = () => {
    const newItems = [...items];
    const hiddenIndices: number[] = [];
    
    // Hide first 3 items from first row
    for (let i = 0; i < 3; i++) {
      hiddenIndices.push(i);
    }
    // Hide 1 item from second row
    hiddenIndices.push(4);

    const dragItems: GameItem[] = [];
    hiddenIndices.forEach(index => {
      newItems[index].isHidden = true;
      dragItems.push(items[index]);
    });

    setItems(newItems);
    setDraggedItems(dragItems);
  };

  const handleDragStart = (e: React.DragEvent, item: GameItem) => {
    e.dataTransfer.setData('itemId', item.id.toString());
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const draggedItemId = parseInt(e.dataTransfer.getData('itemId'));
    const draggedItem = draggedItems.find(item => item.id === draggedItemId);
    
    if (draggedItem && items[targetIndex].id === draggedItem.id) {
      const newItems = [...items];
      newItems[targetIndex].isHidden = false;
      setItems(newItems);
      setDraggedItems(draggedItems.filter(item => item.id !== draggedItemId));

      // Check if all items are matched
      if (draggedItems.length === 1) { // Will be 0 after this match
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
    setGameStarted(false);
    setCountdown(5);
    setItems([...items]);
    setDraggedItems([]);
  };

  return (
    <GameSectionLayout 
      title="Суреттердің тиісті орындарын табу" 
      backgroundImage="/assets/bg/memory.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center justify-center p-6 text-black">
        <div className="grid grid-cols-4 gap-4 my-6">
          {items.map((item, index) => (
            <div 
              key={item.id}
              className="border p-4 rounded-lg flex flex-col items-center bg-white"
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}
            >
              {item.isHidden ? (
                <div className="h-44 w-44 bg-gray-300" />
              ) : (
                <>
                  <Image 
                    src={item.image} 
                    alt={item.alt} 
                    width={176}
                    height={176}
                    className="h-44 w-44 object-contain mb-2"
                  />
                  <p className="font-bold">{item.alt}</p>
                </>
              )}
            </div>
          ))}
        </div>

        {!gameStarted ? (
          <button 
            onClick={startGame}
            className="bg-blue-500 text-white px-12 py-4 rounded-lg mt-6 text-4xl"
          >
            Ойынды бастау
          </button>
        ) : countdown > 0 ? (
          <div className="text-6xl font-bold text-white">{countdown}</div>
        ) : (
          <div className="flex gap-4">
            {draggedItems.map((item) => (
              <Image
                key={item.id}
                src={item.image}
                alt={item.alt}
                width={176}
                height={176}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className="border bg-white p-4 rounded-lg h-44 w-44 cursor-pointer"
              />
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <GameModal success={success} onRestart={handleRestart} />
          </div>
        )}
      </div>
    </GameSectionLayout>
  );
}
