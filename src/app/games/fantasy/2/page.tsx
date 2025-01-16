'use client'
import { useEffect, useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import Image from 'next/image';
import GameModal from '@/app/components/GameModal';

interface Fruit {
  id: number;
  image: string;
  alt: string;
  correctColor: string;
}

export default function FantasyGameTwo() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shuffledFruits, setShuffledFruits] = useState<Fruit[]>([]);

  const fruits: Fruit[] = [
    { id: 1, image: "/assets/games/cucumber.jpg", alt: "Қияр", correctColor: "green" },
    { id: 2, image: "/assets/games/strawberry.png", alt: "Құлпынай", correctColor: "red" },
    { id: 3, image: "/assets/games/orange.jpg", alt: "Апельсин", correctColor: "orange" },
    { id: 4, image: "/assets/games/banana.png", alt: "Банан", correctColor: "yellow" },
    { id: 5, image: "/assets/games/bone.jpg", alt: "Сүйек", correctColor: "white" },
    { id: 6, image: "/assets/games/bus.webp", alt: "Автобус", correctColor: "blue" },
    { id: 7, image: "/assets/games/horse.png", alt: "Ат", correctColor: "brown" },
  ];

  const [matched, setMatched] = useState<boolean[]>(Array(fruits.length).fill(false));

  useEffect(() => {
    shuffleFruits();
  }, []);

  const shuffleFruits = () => {
    const newFruits = [...fruits].sort(() => Math.random() - 0.5);
    setShuffledFruits(newFruits);
  };

  const handleDragStart = (e: React.DragEvent, color: string) => {
    e.dataTransfer.setData('color', color);
  };

  const handleDrop = (e: React.DragEvent, fruit: Fruit, index: number) => {
    e.preventDefault();
    const droppedColor = e.dataTransfer.getData('color');

    if (droppedColor === fruit.correctColor) {
      const newMatched = [...matched];
      newMatched[index] = true;
      setMatched(newMatched);

      if (newMatched.every(m => m)) {
        setSuccess(true);
        setTimeout(() => {
          setShowModal(true);
        }, 500);
      }
    } else {
      const element = document.getElementById(`fruit-${index}`);
      element?.classList.add('shake');
      setTimeout(() => {
        element?.classList.remove('shake');
      }, 500);
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setMatched(Array(fruits.length).fill(false));
    shuffleFruits();
  };

  return (
    <GameSectionLayout 
      title="Түстерді дұрыс элементтерге сүйреңіз" 
      backgroundImage="/assets/bg/2.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6 gap-8">
        <div className="grid grid-cols-4 gap-4">
          {shuffledFruits.map((fruit, index) => (
            <div 
              key={fruit.id} 
              id={`fruit-${index}`} 
              className={`border-2 p-4 rounded-lg flex flex-col items-center bg-white transition-all
                ${matched[index] ? 'border-green-500 bg-green-50' : 'border-gray-200'}
                hover:border-blue-500`}
              onDrop={(e) => handleDrop(e, fruit, index)} 
              onDragOver={(e) => e.preventDefault()}
            >
              <Image 
                src={fruit.image} 
                alt={fruit.alt} 
                width={160} 
                height={160} 
                className="h-48 object-contain mb-2" 
              />
              <p className="font-bold">{fruit.alt}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 p-4 bg-white/50 rounded-xl">
          {[
            { color: "green", label: "Жасыл" },
            { color: "red", label: "Қызыл" },
            { color: "orange", label: "Қызғылт сары" },
            { color: "yellow", label: "Сары" },
            { color: "white", label: "Ақ" },
            { color: "blue", label: "Көк" },
            { color: "brown", label: "Қоңыр" },
          ].map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, item.color)}
              className="flex flex-col items-center gap-2 cursor-move"
            >
              <div 
                style={{ backgroundColor: item.color }}
                className="w-16 h-16 rounded-lg border-2 border-gray-300 hover:scale-110 transition-transform"
              />
              <span className="text-sm font-medium text-white">{item.label}</span>
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
      `}</style>
    </GameSectionLayout>
  );
}
