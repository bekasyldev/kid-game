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

interface Food {
  id: number;
  name: string;
  image: string;
  forAnimal: number; // matches animal id
}

export default function FantasyGameFive() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  const animals: Animal[] = [
    { id: 1, name: 'Ат', image: '/assets/games/horse.png' },
    { id: 2, name: 'Қоян', image: '/assets/games/rabbit.png' },
    { id: 3, name: 'Құс', image: '/assets/games/bird.png' },
    { id: 4, name: 'Ит', image: '/assets/games/dog.png' },
    { id: 5, name: 'Мысық', image: '/assets/games/cat.png' },
  ];

  const foods: Food[] = [
    { id: 1, name: 'Шөп', image: '/assets/games/grass.png', forAnimal: 1 },
    { id: 2, name: 'Сәбіз', image: '/assets/games/carrot.jpg', forAnimal: 2 },
    { id: 3, name: 'Дән', image: '/assets/games/seeds.png', forAnimal: 3 },
    { id: 4, name: 'Сүйек', image: '/assets/games/bone.jpg', forAnimal: 4 },
    { id: 5, name: 'Балық', image: '/assets/games/fish.png', forAnimal: 5 },
  ].sort(() => Math.random() - 0.5);

  const [availableFoods, setAvailableFoods] = useState([...foods]);

  const handleDragStart = (e: React.DragEvent, food: Food) => {
    e.dataTransfer.setData('foodId', food.id.toString());
  };

  const handleDrop = (e: React.DragEvent, animalId: number) => {
    e.preventDefault();
    const foodId = parseInt(e.dataTransfer.getData('foodId'));
    const droppedFood = foods.find(f => f.id === foodId);
    
    if (droppedFood?.forAnimal === animalId) {
      setMatchedPairs(prev => [...prev, animalId]);
      setAvailableFoods(prev => prev.filter(f => f.id !== foodId));

      if (matchedPairs.length + 1 === animals.length) {
        setSuccess(true);
        setShowModal(true);
      }
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setMatchedPairs([]);
    setAvailableFoods([...foods].sort(() => Math.random() - 0.5));
  };

  return (
    <GameSectionLayout 
      title="Кім не жейді?" 
      backgroundImage="/assets/bg/fantasy.webp"
      darkHeader
    >
      <div className="flex justify-between p-6">
        {/* Animals */}
        <div className="flex flex-col gap-4">
          {animals.map((animal) => (
            <div
              key={animal.id}
              onDrop={(e) => handleDrop(e, animal.id)}
              onDragOver={(e) => e.preventDefault()}
              className={`w-48 h-48 bg-white rounded-lg p-4 flex items-center justify-center
                ${matchedPairs.includes(animal.id) ? 'bg-green-100' : ''}`}
            >
              <Image 
                src={animal.image} 
                alt={animal.name} 
                width={120} 
                height={120} 
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Foods */}
        <div className="flex flex-col gap-4">
          {availableFoods.map((food) => (
            <div
              key={food.id}
              draggable
              onDragStart={(e) => handleDragStart(e, food)}
              className="w-48 h-48 bg-white rounded-lg p-4 flex items-center justify-center cursor-move"
            >
              <Image 
                src={food.image} 
                alt={food.name} 
                width={120} 
                height={120} 
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
