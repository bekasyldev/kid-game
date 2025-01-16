'use client'
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import Image from 'next/image';
import GameModal from '@/app/components/GameModal';

interface Animal {
  id: number;
  image: string;
  letter: string;
  alt: string;
}

export default function FantasyGameOne() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [animals] = useState<Animal[]>([
    { id: 1, image: "/assets/games/rabbit.png", letter: "Қ", alt: "Қоян" },
    { id: 2, image: "/assets/games/tiger.png", letter: "Ж", alt: "Жолбарыс" },
    { id: 3, image: "/assets/games/fox.png", letter: "Т", alt: "Түлкі" },
    { id: 4, image: "/assets/games/kangaroo.png", letter: "К", alt: "Кенгуру" },
    { id: 5, image: "/assets/games/bird.png", letter: "Қ", alt: "Құс" },
    { id: 6, image: "/assets/games/horse.png", letter: "Ж", alt: "Жылқы" },
    { id: 7, image: "/assets/games/bee_4.png", letter: "А", alt: "Ара" },
    { id: 8, image: "/assets/games/frog.png", letter: "B", alt: "Бақа" },
  ]);

  const [inputs, setInputs] = useState<{ [key: number]: string }>({});

  const handleInputChange = (id: number, value: string) => {
    setInputs(prev => ({
      ...prev,
      [id]: value.toLowerCase(),
    }));

    // Check if the input is correct
    if (value.toLowerCase() === animals.find(animal => animal.id === id)?.letter.toLowerCase()) {
      const element = document.getElementById(`animal-${id}`);
      element?.classList.add('correct-answer');
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setInputs({});
    // Remove all correct-answer classes
    animals.forEach(animal => {
      const element = document.getElementById(`animal-${animal.id}`);
      element?.classList.remove('correct-answer');
    });
  };

  const checkAllCorrect = () => {
    const allCorrect = animals.every(animal => inputs[animal.id]?.toLowerCase() === animal.letter.toLowerCase());
    if (allCorrect) {
      setSuccess(true);
      setShowModal(true);
    }
  };

  return (
    <GameSectionLayout 
      title="Жануарды оның әрпімен сәйкестендіріңіз" 
      backgroundImage="/assets/bg/1.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        <div className="grid grid-cols-4 gap-4 my-6">
          {animals.map(animal => (
            <div key={animal.id} id={`animal-${animal.id}`} className="border p-4 rounded-lg flex flex-col items-center bg-white">
              <Image src={animal.image} alt={animal.alt} width={160} height={160} className="h-48 object-contain" />
              <input
                type="text"
                maxLength={1}
                className="w-8 h-8 text-center border rounded bg-white"
                value={inputs[animal.id] || ''}
                onChange={(e) => handleInputChange(animal.id, e.target.value)}
                onBlur={checkAllCorrect}
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
        .correct-answer {
          background-color: #ecfdf5;
          border-color: #34d399;
        }
      `}</style>
    </GameSectionLayout>
  );
}
