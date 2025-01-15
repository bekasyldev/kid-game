'use client'
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import Image from 'next/image';

interface Item {
  id: number;
  image: string;
  alt: string;
  size: 'big' | 'small';
}

export default function ThinkingGameSeven() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  const items: Item[] = [
    { id: 1, image: '/assets/games/bird.png', alt: 'Құс', size: 'big' },
    { id: 2, image: '/assets/games/camel.png', alt: 'Түйе', size: 'big' },
    { id: 3, image: '/assets/games/duck.png', alt: 'Үйрек', size: 'big' },
    { id: 4, image: '/assets/games/gippo.png', alt: 'Бегамот', size: 'big' },
    { id: 5, image: '/assets/games/dog.png', alt: 'Ит', size: 'big' },
    { id: 6, image: '/assets/games/cat.png', alt: 'Мысық', size: 'big' },
    { id: 7, image: '/assets/games/bird.png', alt: 'Құс', size: 'small' },
    { id: 8, image: '/assets/games/camel.png', alt: 'Түйе', size: 'small' },
    { id: 9, image: '/assets/games/duck.png', alt: 'Үйрек', size: 'small' },
    { id: 10, image: '/assets/games/gippo.png', alt: 'Бегамот', size: 'small' },
    { id: 11, image: '/assets/games/dog.png', alt: 'Ит', size: 'small' },
    { id: 12, image: '/assets/games/cat.png', alt: 'Мысық', size: 'small' },

  ];

  const [availableItems, setAvailableItems] = useState([...items].sort(() => Math.random() - 0.5));

  const handleDragStart = (e: React.DragEvent, item: Item) => {
    e.dataTransfer.setData('itemId', item.id.toString());
    e.dataTransfer.setData('itemAlt', item.alt);
    e.dataTransfer.setData('itemSize', item.size);
  };

  const handleDrop = (e: React.DragEvent, targetItem: Item) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('itemId'));
    const draggedAlt = e.dataTransfer.getData('itemAlt');
    const draggedSize = e.dataTransfer.getData('itemSize');

    if (draggedAlt === targetItem.alt && draggedSize !== targetItem.size) {
      setMatchedPairs(prev => [...prev, draggedId, targetItem.id]);
      setAvailableItems(prev => prev.filter(item => 
        item.id !== draggedId && item.id !== targetItem.id
      ));

      if (matchedPairs.length + 2 === items.length) {
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
    setAvailableItems([...items].sort(() => Math.random() - 0.5));
  };

  return (
    <GameSectionLayout 
      title="Үлкен-Кіші" 
      backgroundImage="/assets/bg/thinking.webp"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        <div className="grid grid-cols-4 gap-4">
          {availableItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDrop={(e) => handleDrop(e, item)}
              onDragOver={handleDragOver}
              className={`bg-white rounded-lg flex items-center justify-center 
                ${item.size === 'big' ? 'w-40 h-40' : 'w-24 h-24'} 
                ${item.size === 'big' ? 'border-blue-500' : 'border-green-500'} border-2 cursor-move`}
            >
              <Image 
                src={item.image} 
                alt={item.alt} 
                width={item.size === 'big' ? 120 : 60} 
                height={item.size === 'big' ? 120 : 60} 
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
