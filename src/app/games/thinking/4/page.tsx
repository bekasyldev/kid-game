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
  src: string;
  forAnimal: string;
}

export default function ThinkingGameFour() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  const animals: Animal[] = [
    { id: 1, name: 'Балық', image: '/assets/games/fish.png' },
    { id: 2, name: 'Қоян', image: '/assets/games/rabbit.png' },
    { id: 3, name: 'Ит', image: '/assets/games/dog.png' },
    { id: 4, name: 'Өрмекші', image: '/assets/games/spider.jpg' },
    { id: 5, name: 'Ара', image: '/assets/games/bee_4.png' },
  ];

  const homes: Home[] = [
    { id: 1, src: '/assets/games/fish-home.jpg', forAnimal: 'Балық' },
    { id: 2, src: '/assets/games/bee-home.jpg', forAnimal: 'Ара' },
    { id: 3, src: '/assets/games/web.jpg', forAnimal: 'Өрмекші' },
    { id: 4, src: '/assets/games/dog-home.jpg', forAnimal: 'Ит' },
    { id: 5, src: '/assets/games/rabbit-home.jpg', forAnimal: 'Қоян' },
  ].sort(() => Math.random() - 0.5);

  const handleAnimalClick = (animal: Animal) => {
    if (!matchedPairs.includes(animal.id)) {
      setSelectedAnimal(animal);
    }
  };

  const handleHomeClick = (home: Home) => {
    if (!selectedAnimal) return;

    if (selectedAnimal.name === home.forAnimal) {
      setMatchedPairs(prev => [...prev, selectedAnimal.id]);
      setSelectedAnimal(null);

      const newMatchedCount = matchedPairs.length + 1;
      if (newMatchedCount === animals.length) {
        setTimeout(() => {
          setSuccess(true);
          setShowModal(true);
        }, 500);
      }
    } else {
      const element = document.getElementById(`home-${home.id}`);
      element?.classList.add('shake');
      setTimeout(() => {
        element?.classList.remove('shake');
      }, 500);
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setMatchedPairs([]);
    setSelectedAnimal(null);
  };

  return (
    <GameSectionLayout 
      title="Кім қайда мекендейді?" 
      backgroundImage="/assets/bg/4.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        {/* Animals */}
        <div className="flex gap-4 mb-8">
          {animals.map((animal) => (
            <div
              key={animal.id}
              onClick={() => handleAnimalClick(animal)}
              className={`w-48 h-48 bg-white rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all
                ${matchedPairs.includes(animal.id) ? 'opacity-50' : ''}
                ${selectedAnimal?.id === animal.id ? 'ring-4 ring-blue-500' : ''}
                ${!matchedPairs.includes(animal.id) && 'hover:shadow-lg'}`}
            >
              <Image 
                src={animal.image} 
                alt={animal.name} 
                width={140} 
                height={140} 
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
              id={`home-${home.id}`}
              onClick={() => handleHomeClick(home)}
              className={`w-48 h-48 bg-white rounded-lg p-4 flex items-center justify-center transition-all
                ${matchedPairs.includes(animals.find(a => a.name === home.forAnimal)?.id || 0) 
                  ? 'border-4 border-green-500' 
                  : selectedAnimal ? 'cursor-pointer hover:border-2 hover:border-blue-500' : 'border-2 border-dashed'}`}
            >
              <Image 
                src={home.src} 
                alt={home.forAnimal} 
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