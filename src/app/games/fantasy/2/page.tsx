'use client'
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import Image from 'next/image';
import GameModal from '@/app/components/GameModal';

interface Fruit {
  id: number;
  image: string;
  alt: string;
}

export default function FantasyGameTwo() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fruits] = useState<Fruit[]>([
    { id: 1, image: "/assets/games/cucumber.jpg", alt: "Қияр" },
    { id: 2, image: "/assets/games/strawberry.png", alt: "Құлпынай" },
    { id: 3, image: "/assets/games/orange.jpg", alt: "Апельсин" },
    { id: 4, image: "/assets/games/banana.png", alt: "Банан" },
  ]);

  const [matched, setMatched] = useState<boolean[]>(Array(fruits.length).fill(false));

  const handleDragStart = (e: React.DragEvent, color: string) => {
    e.dataTransfer.setData('color', color);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const droppedColor = e.dataTransfer.getData('color');

    // Check if the dropped color matches the fruit
    const correctColors = ["green", "red", "orange", "yellow"];
    if (droppedColor === correctColors[index]) {
      const newMatched = [...matched];
      newMatched[index] = true;
      // add green background
      const element = document.getElementById(`fruit-${index}`);
      element?.classList.add('correct-answer');
      setMatched(newMatched);
      
      // Check if all fruits are matched
      if (newMatched.every(m => m)) {
        setSuccess(true);
        setTimeout(() => {
          setShowModal(true);
        }, 500);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setMatched(Array(fruits.length).fill(false));
  };

  return (
    <GameSectionLayout 
      title="Түстерді дұрыс элементтерге сүйреңіз" 
      backgroundImage="/assets/bg/fantasy.webp"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {fruits.map((fruit, index) => (
            <div key={fruit.id} id={`fruit-${index}`} className="border p-4 rounded-lg flex flex-col items-center bg-white" onDrop={(e) => handleDrop(e, index)} onDragOver={handleDragOver}>
              <Image src={fruit.image} alt={fruit.alt} width={160} height={160} className="h-48 object-contain mb-2" />
              <p className="font-bold">{fruit.alt}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <div draggable onDragStart={(e) => handleDragStart(e, "green")} style={{ backgroundColor: "green" }} className="border p-4 rounded-lg text-2xl font-bold cursor-pointer"></div>
          <div draggable onDragStart={(e) => handleDragStart(e, "red")} style={{ backgroundColor: "red" }} className="border p-4 rounded-lg text-2xl font-bold cursor-pointer"></div>
          <div draggable onDragStart={(e) => handleDragStart(e, "orange")} style={{ backgroundColor: "orange" }} className="border p-4 rounded-lg text-2xl font-bold cursor-pointer"></div>
          <div draggable onDragStart={(e) => handleDragStart(e, "yellow")} style={{ backgroundColor: "yellow" }} className="border p-4 rounded-lg text-2xl font-bold cursor-pointer"></div>
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
