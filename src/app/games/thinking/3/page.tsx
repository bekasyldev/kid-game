'use client'
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import Image from 'next/image';
import GameModal from '@/app/components/GameModal';

interface Item {
  id: number;
  image: string;
  number: number;
}

export default function ThinkingGameThree() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [items] = useState<Item[]>([
    { id: 1, image: "/assets/games/flower_6.png", number: 6 },
    { id: 2, image: "/assets/games/bee_4.png", number: 4 },
    { id: 3, image: "/assets/games/apple_3.png", number: 3 },
    { id: 4, image: "/assets/games/cloud_1.webp", number: 1 },
  ]);

  const handleDragStart = (e: React.DragEvent, number: number) => {
    e.dataTransfer.setData('number', number.toString());
  };

  const handleDrop = (e: React.DragEvent, item: Item) => {
    e.preventDefault();
    const droppedNumber = parseInt(e.dataTransfer.getData('number'));
    
    if (droppedNumber === item.number) {
      const element = document.getElementById(`item-${item.id}`);
      element?.classList.add('correct-match');
      
      // Check if all items are matched
      const allMatched = items.every(item => {
        const element = document.getElementById(`item-${item.id}`);
        return element?.classList.contains('correct-match');
      });

      if (allMatched) {
        setSuccess(true);
        setShowModal(true);
      }
    } else {
      const element = document.getElementById(`item-${item.id}`);
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
    
    // Remove all correct-match classes
    items.forEach(item => {
      const element = document.getElementById(`item-${item.id}`);
      element?.classList.remove('correct-match');
    });

  };

  return (
    <GameSectionLayout 
      title="Сандармен сәйкестендір" 
      backgroundImage="/assets/bg/3.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        <div className="grid grid-cols-4 gap-6 my-10">
          {items.map((item) => (
            <div
              key={item.id}
              id={`item-${item.id}`}
              className="w-48 h-48 border p-4 rounded-lg flex flex-col items-center bg-white"
              onDrop={(e) => handleDrop(e, item)}
              onDragOver={handleDragOver}
            >
              <Image
                src={item.image}
                alt={`Image ${item.number}`}
                width={144}
                height={144}
                className="h-36 w-36 object-contain mb-4"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.number)}
              className="border p-8 rounded-lg text-4xl font-bold cursor-pointer bg-white"
            >
              {item.number}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <GameModal success={success} onRestart={handleRestart} />
        </div>
      )}

      <style jsx global>{`
        .shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }

        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }

        .correct-match {
          background-color: #ecfdf5;
          border-color: #34d399;
        }
      `}</style>
    </GameSectionLayout>
  );
}
