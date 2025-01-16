'use client'
import { useState, useEffect } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import Image from 'next/image';
import GameModal from '@/app/components/GameModal';

interface Item {
  id: number;
  image: string;
  word: string;
}

export default function FantasyGameThree() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [items] = useState<Item[]>([
    { id: 1, image: "/assets/games/dog.png", word: "Ит" },
    { id: 2, image: "/assets/games/pen.png", word: "Қалам" },
    { id: 3, image: "/assets/games/car.png", word: "Көлік" },
    { id: 4, image: "/assets/games/table.png", word: "Стол" },
    { id: 5, image: "/assets/games/clock.png", word: "Сағат" },
    { id: 6, image: "/assets/games/bird.png", word: "Құс" },
    { id: 7, image: "/assets/games/duck.png", word: "Үйрек" },
    { id: 8, image: "/assets/games/frog.png", word: "Бақа" },

  ]);

  const [matched, setMatched] = useState<boolean[]>(Array(items.length).fill(false));
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle words on component mount
    setShuffledWords([...items].map(item => item.word).sort(() => Math.random() - 0.5));
  }, []);

  const handleDragStart = (e: React.DragEvent, word: string) => {
    e.dataTransfer.setData('word', word);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const droppedWord = e.dataTransfer.getData('word');

    if (droppedWord === items[index].word) {
      const newMatched = [...matched];
      newMatched[index] = true;
      setMatched(newMatched);

      // Check if all items are matched
      if (newMatched.every(m => m)) {
        setSuccess(true);
        setTimeout(() => {
          setShowModal(true);
        }, 500);
      }
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setMatched(Array(items.length).fill(false));
    setShuffledWords([...items].map(item => item.word).sort(() => Math.random() - 0.5));
  };

  return (
    <GameSectionLayout 
      title="Сөздерді дұрыс элементтерге сүйреңіз" 
      backgroundImage="/assets/bg/3.jpg"
      darkHeader
    >
      <div className="relative flex flex-col items-center p-6">
        <div className="grid grid-cols-4 gap-4 my-6">
          {items.map((item, index) => (
            <div 
              key={item.id} 
              id={`item-${index}`} 
              className={`border p-4 rounded-lg flex flex-col items-center bg-white
                ${matched[index] ? 'bg-green-100' : ''}`}
              onDrop={(e) => handleDrop(e, index)} 
              onDragOver={(e) => e.preventDefault()}
            >
              <Image 
                src={item.image} 
                alt={item.word} 
                width={160} 
                height={160} 
                className="h-48 w-48 object-contain mb-2" 
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          {shuffledWords.map((word, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, word)}
              className={`border p-4 rounded-lg text-lg font-bold cursor-pointer bg-white
                ${matched[items.findIndex(item => item.word === word)] ? 'opacity-50' : ''}`}
            >
              {word}
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
