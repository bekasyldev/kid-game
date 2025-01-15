'use client'
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import Image from 'next/image';

interface Animal {
  id: number;
  name: string;
  image: string;
}

interface Home {
  id: number;
  name: string;
  forAnimal: string;
}

export default function ThinkingGameFour() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  const animals: Animal[] = [
    { id: 1, name: 'Крокодил', image: '/assets/games/crocodile.webp' },
    { id: 2, name: 'Мысық', image: '/assets/games/cat.png' },
    { id: 3, name: 'Қоян', image: '/assets/games/rabbit.png' },
    { id: 4, name: 'Ит', image: '/assets/games/dog.png' },
    { id: 5, name: 'Кенгуру', image: '/assets/games/kangaroo.png' },
  ];

  const homes: Home[] = [
    { id: 1, name: 'Суда',  forAnimal: 'Крокодил' },
    { id: 2, name: 'Үй', forAnimal: 'Мысық' },
    { id: 3, name: 'Австралия', forAnimal: 'Кенгуру' },
    { id: 4, name: 'Үй', forAnimal: 'Ит' },
    { id: 5, name: 'Іні', forAnimal: 'Қоян' },
  ].sort(() => Math.random() - 0.5);

  const [availableAnimals, setAvailableAnimals] = useState([...animals]);

  const handleDragStart = (e: React.DragEvent, animal: Animal) => {
    e.dataTransfer.setData('animalId', animal.id.toString());
    e.dataTransfer.setData('animalName', animal.name);
  };

  const handleDrop = (e: React.DragEvent, home: Home) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('animalId'));
    const draggedName = e.dataTransfer.getData('animalName');

    if (draggedName === home.forAnimal) {
      setMatchedPairs(prev => [...prev, draggedId]);
      setAvailableAnimals(prev => prev.filter(animal => animal.id !== draggedId));

      if (matchedPairs.length + 1 === animals.length) {
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
    setAvailableAnimals([...animals]);
  };

  return (
    <GameSectionLayout 
      title="Кім қайда мекендейді?" 
      backgroundImage="/assets/bg/thinking.webp"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        {/* Animals */}
        <div className="flex gap-4 mb-8">
          {availableAnimals.map((animal) => (
            <div
              key={animal.id}
              draggable
              onDragStart={(e) => handleDragStart(e, animal)}
              className="w-32 h-32 bg-white rounded-lg p-4 flex flex-col items-center justify-center cursor-move"
            >
              <Image 
                src={animal.image} 
                alt={animal.name} 
                width={80} 
                height={80} 
                className="object-contain"
              />
              <div className="mt-2 text-center font-medium">
                {animal.name}
              </div>
            </div>
          ))}
        </div>

        {/* Homes */}
        <div className="grid grid-cols-3 gap-6">
          {homes.map((home) => (
            <div
              key={home.id}
              onDrop={(e) => handleDrop(e, home)}
              onDragOver={handleDragOver}
              className={`w-48 h-48 bg-white rounded-lg p-4 flex flex-col items-center justify-center
                ${matchedPairs.includes(animals.find(a => a.name === home.forAnimal)?.id || 0) 
                  ? 'border-4 border-green-500' 
                  : 'border-2 border-dashed'}`}
            >
              <div className="mt-2 text-center font-medium">
                {home.name}
              </div>
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