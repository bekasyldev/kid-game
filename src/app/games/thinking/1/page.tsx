'use client'
import { useState, useEffect } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import Image from 'next/image';
import GameModal from '@/app/components/GameModal';

interface Animal {
  id: number;
  image: string;
  alt: string;
}

export default function ThinkingGameOne() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [animals] = useState<Animal[]>([
    { id: 1, image: "/assets/games/rabbit.png", alt: "Қоян" },
    { id: 2, image: "/assets/games/tiger.png", alt: "Жолбарыс" },
    { id: 3, image: "/assets/games/elk.png", alt: "Бұлан" },
    { id: 4, image: "/assets/games/kangaroo.png", alt: "Кенгуру" },
    { id: 5, image: "/assets/games/gippo.png", alt: "Сусиыр" },
  ]);

  useEffect(() => {
    // Randomly select an animal when component mounts
    const randomIndex = Math.floor(Math.random() * animals.length);
    setSelectedAnimal(animals[randomIndex]);
  }, []);

  const handleAnimalClick = (animal: Animal) => {
    if (animal.id === selectedAnimal?.id) {
      setSuccess(true);
      setShowModal(true);
    } else {
      // Add shake animation class to the clicked wrong animal
      const element = document.getElementById(`animal-${animal.id}`);
      element?.classList.add('shake');
      setTimeout(() => {
        element?.classList.remove('shake');
      }, 500);
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    const randomIndex = Math.floor(Math.random() * animals.length);
    setSelectedAnimal(animals[randomIndex]);
  };

  return (
    <GameSectionLayout 
      title="Жануарды көлеңкесіне қарай табыңыз" 
      backgroundImage="/assets/bg/thinking.webp"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        <div className="mb-6">
          {selectedAnimal && (
            <Image
              src={selectedAnimal.image}
              alt={selectedAnimal.alt}
              width={256}
              height={256}
              className="h-64 object-contain mt-4"
            />
          )}
        </div>

        <div className="grid grid-cols-5 gap-4">
          {animals.map((animal) => (
            <button
              key={animal.id}
              id={`animal-${animal.id}`}
              onClick={() => handleAnimalClick(animal)}
              className="border bg-white p-4 rounded-lg"
            >
              <Image
                src={animal.image}
                alt={animal.alt}
                width={160}
                height={160}
                className="h-full object-contain grayscale brightness-0"
              />
            </button>
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
