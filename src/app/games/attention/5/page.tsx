'use client'
import { useState, useEffect } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import Image from 'next/image';

interface Card {
  id: number;
  image: string;
  alt: string;
}

export default function AttentionGameFive() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);

  const cards: Card[] = [
    { id: 1, image: "/assets/games/duck.png", alt: "Қаз" },
    { id: 2, image: "/assets/games/bird.png", alt: "Құс" },
    { id: 3, image: "/assets/games/bus.webp", alt: "Автобус" },
    { id: 4, image: "/assets/games/car.png", alt: "Машина" },
    { id: 5, image: "/assets/games/clock.png", alt: "Сағат" },
    { id: 6, image: "/assets/games/bird.png", alt: "Құс" },
    { id: 7, image: "/assets/games/duck.png", alt: "Қаз" },
    { id: 8, image: "/assets/games/clock.png", alt: "Сағат" },
    { id: 9, image: "/assets/games/car.png", alt: "Машина" },
    { id: 10, image: "/assets/games/bus.webp", alt: "Автобус" },
  ];

  useEffect(() => {
    setShuffledCards([...cards].sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = (cardId: number) => {
    if (selectedCards.length === 2 || selectedCards.includes(cardId) || matchedPairs.includes(cardId)) return;

    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      const firstCard = shuffledCards.find(c => c.id === first);
      const secondCard = shuffledCards.find(c => c.id === second);

      if (firstCard?.image === secondCard?.image) {
        setTimeout(() => {
          setMatchedPairs(prev => [...prev, first, second]);
          setSelectedCards([]);
          
          // Check for game completion after updating matchedPairs
          if (matchedPairs.length + 2 === cards.length) {
            setSuccess(true);
            setShowModal(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setSelectedCards([]);
    setMatchedPairs([]);
    setShuffledCards([...cards].sort(() => Math.random() - 0.5));
  };

  return (
    <GameSectionLayout 
      title="Сыңарын тап" 
      backgroundImage="/assets/bg/memory.jpg"
      darkHeader
    >
      <div className="flex justify-center p-6">
        <div className="grid grid-cols-4 gap-4">
          {shuffledCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`w-40 h-40 border-2 rounded-lg flex items-center justify-center cursor-pointer bg-white
                ${matchedPairs.includes(card.id) ? 'invisible' : ''}
                ${selectedCards.includes(card.id) ? 'bg-blue-100' : ''}`}
            >
              {(selectedCards.includes(card.id) || !matchedPairs.includes(card.id)) && (
                <Image 
                  src={card.image} 
                  alt={card.alt} 
                  width={120} 
                  height={120} 
                  className="object-contain"
                />
              )}
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
