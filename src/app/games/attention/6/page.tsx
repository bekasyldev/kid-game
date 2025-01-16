'use client'
import { useState, useEffect } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import { FaCircle, FaSquare, FaStar, FaHeart } from 'react-icons/fa';

interface Card {
  id: number;
  icon: React.ReactNode;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function AttentionGameSix() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [cards, setCards] = useState<Card[]>([]);

  const initialCards: Card[] = [
    { id: 1, icon: <FaCircle size={40} />, color: "rgb(239, 68, 68)", isFlipped: false, isMatched: false },
    { id: 2, icon: <FaCircle size={40} />, color: "rgb(239, 68, 68)", isFlipped: false, isMatched: false },
    { id: 3, icon: <FaSquare size={40} />, color: "rgb(34, 197, 94)", isFlipped: false, isMatched: false },
    { id: 4, icon: <FaSquare size={40} />, color: "rgb(34, 197, 94)", isFlipped: false, isMatched: false },
    { id: 5, icon: <FaStar size={40} />, color: "rgb(234, 179, 8)", isFlipped: false, isMatched: false },
    { id: 6, icon: <FaStar size={40} />, color: "rgb(234, 179, 8)", isFlipped: false, isMatched: false },
    { id: 7, icon: <FaHeart size={40} />, color: "rgb(147, 51, 234)", isFlipped: false, isMatched: false },
    { id: 8, icon: <FaHeart size={40} />, color: "rgb(147, 51, 234)", isFlipped: false, isMatched: false },
  ];

  useEffect(() => {
    setCards([...initialCards].sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = (cardId: number) => {
    if (selectedCards.length === 2 || selectedCards.includes(cardId)) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isMatched) return;

    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard?.color === secondCard?.color) {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second ? { ...c, isMatched: true } : c
          ));
          setSelectedCards([]);
          
          // Check if all pairs are matched
          const remainingCards = cards.filter(c => !c.isMatched).length - 2;
          if (remainingCards === 0) {
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
    setCards([...initialCards].sort(() => Math.random() - 0.5).map(card => ({
      ...card,
      isMatched: false
    })));
  };

  return (
    <GameSectionLayout 
      title="Сыңарын тауып көр" 
      backgroundImage="/assets/bg/6.jpg"
      darkHeader
    >
      <div className="flex justify-center p-6">
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`w-32 h-32 rounded-lg cursor-pointer transition-all duration-300 transform
                ${card.isMatched ? 'invisible' : 'bg-white'}
                ${selectedCards.includes(card.id) ? 'bg-blue-100' : ''}`}
            >
              <div className="w-full h-full flex items-center justify-center" style={{ color: card.color }}>
                {card.icon}
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
