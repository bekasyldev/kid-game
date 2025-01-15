'use client'
import { useEffect, useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import Image from 'next/image';

interface Animal {
  id: number;
  image: string;
  alt: string;
}

export default function MemoryGameSix() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [animals] = useState<Animal[]>([
    { id: 1, image: "/assets/games/rabbit.png", alt: "Қоян" },
    { id: 2, image: "/assets/games/tiger.png", alt: "Жолбарыс" },
    { id: 3, image: "/assets/games/elk.png", alt: "Бұлан" },
    { id: 4, image: "/assets/games/kangaroo.png", alt: "Кенгуру" },
    { id: 5, image: "/assets/games/gippo.png", alt: "Сусиыр" },
  ]);

  const [originalSequence, setOriginalSequence] = useState<Animal[]>([]);
  const [userSequence, setUserSequence] = useState<Animal[]>([]);
  const [showingSequence, setShowingSequence] = useState(true);
  const [availableAnimals, setAvailableAnimals] = useState<Animal[]>([]);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffled = [...animals].sort(() => Math.random() - 0.5);
    setOriginalSequence(shuffled);
    setShowingSequence(true);
    setUserSequence([]);
    setRevealedCards([]);
    setAvailableAnimals([]);
    
    // Show sequence for 5 seconds then hide
    setTimeout(() => {
      setShowingSequence(false);
      setAvailableAnimals([...shuffled].sort(() => Math.random() - 0.5));
    }, 5000);
  };

  const handleAnimalClick = (animal: Animal) => {
    if (showingSequence) return;

    const newSequence = [...userSequence, animal];
    setUserSequence(newSequence);
    setAvailableAnimals(prev => prev.filter(a => a.id !== animal.id));

    // If the animal is in the correct position, reveal it
    const currentPosition = userSequence.length;
    if (originalSequence[currentPosition]?.id === animal.id) {
      setRevealedCards(prev => [...prev, currentPosition]);
    }

    // Check if sequence is complete
    if (newSequence.length === originalSequence.length) {
      const isCorrect = newSequence.every((animal, index) => 
        animal.id === originalSequence[index].id
      );
      setSuccess(isCorrect);
      setShowModal(true);
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    startNewGame();
  };

  return (
    <GameSectionLayout 
      title="Қатарды есіне сақтап ал" 
      backgroundImage="/assets/bg/memory.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        <div className="flex gap-4 mb-8">
          {originalSequence.map((animal, index) => (
            <div key={index} className="w-32 h-32 border rounded-lg bg-white flex items-center justify-center">
              {(showingSequence || revealedCards.includes(index)) ? (
                <Image 
                  src={animal.image} 
                  alt={animal.alt} 
                  width={100} 
                  height={100} 
                  className="object-contain" 
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg" />
              )}
            </div>
          ))}
        </div>

        {!showingSequence && (
          <div className="grid grid-cols-5 gap-4">
            {availableAnimals.map((animal) => (
              <div
                key={animal.id}
                onClick={() => handleAnimalClick(animal)}
                className="cursor-pointer border p-4 rounded-lg bg-white"
              >
                <Image src={animal.image} alt={animal.alt} width={100} height={100} className="object-contain" />
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <GameModal success={success} onRestart={handleRestart} />
        </div>
      )}
    </GameSectionLayout>
  );
}
