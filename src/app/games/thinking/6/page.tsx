'use client'
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import Image from 'next/image';

interface Item {
  id: number;
  image: string;
  alt: string;
  type: 'fruit' | 'vegetable';
}

export default function ThinkingGameSix() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sortedItems, setSortedItems] = useState<number[]>([]);

  const items: Item[] = [
    { id: 1, image: '/assets/games/apple.png', alt: 'Алма', type: 'fruit' },
    { id: 2, image: '/assets/games/banana.png', alt: 'Банан', type: 'fruit' },
    { id: 3, image: '/assets/games/orange.jpg', alt: 'Апельсин', type: 'fruit' },
    { id: 4, image: '/assets/games/carrot.jpg', alt: 'Сәбіз', type: 'vegetable' },
    { id: 5, image: '/assets/games/tomato.png', alt: 'Қызанақ', type: 'vegetable' },
    { id: 6, image: '/assets/games/cucumber.jpg', alt: 'Қияр', type: 'vegetable' },
  ];

  const [availableItems, setAvailableItems] = useState([...items].sort(() => Math.random() - 0.5));

  const handleDragStart = (e: React.DragEvent, item: Item) => {
    e.dataTransfer.setData('itemId', item.id.toString());
    e.dataTransfer.setData('itemType', item.type);
  };

  const handleDrop = (e: React.DragEvent, basketType: 'fruit' | 'vegetable') => {
    e.preventDefault();
    const itemId = parseInt(e.dataTransfer.getData('itemId'));
    const itemType = e.dataTransfer.getData('itemType');

    if (itemType === basketType) {
      setSortedItems(prev => [...prev, itemId]);
      setAvailableItems(prev => prev.filter(item => item.id !== itemId));

      if (sortedItems.length + 1 === items.length) {
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
    setSortedItems([]);
    setAvailableItems([...items].sort(() => Math.random() - 0.5));
  };

  return (
    <GameSectionLayout 
      title="Себетті толтыр" 
      backgroundImage="/assets/bg/6.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        {/* Baskets */}
        <div className="flex gap-20">
          <div 
            className="w-64 h-64 bg-white rounded-lg flex flex-col items-center p-4"
            onDrop={(e) => handleDrop(e, 'fruit')}
            onDragOver={handleDragOver}
          >
            <h2 className="text-xl font-bold mb-4">Жемістер</h2>
          </div>

          <div 
            className="w-64 h-64 bg-white rounded-lg flex flex-col items-center p-4"
            onDrop={(e) => handleDrop(e, 'vegetable')}
            onDragOver={handleDragOver}
          >
            <h2 className="text-xl font-bold mb-4">Көкеністер</h2>
          </div>
        </div>

        {/* Available items */}
        <div className="mt-8 grid grid-cols-6 gap-4">
          {availableItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="w-48 h-48 bg-white rounded-lg flex items-center justify-center cursor-move"
            >
              <Image src={item.image} alt={item.alt} width={140} height={140} className="object-contain" />
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
