'use client'
import { useState, useEffect } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import Image from 'next/image';
import GameModal from '@/app/components/GameModal';

interface Card {
  id: number;
  image: string;
  alt: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGameFour() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [isChecking, setIsChecking] = useState(false);

  const images = [
    { image: "/assets/games/apple.png", alt: "Алма" },
    { image: "/assets/games/banana.png", alt: "Банан" },
    { image: "/assets/games/car.png", alt: "Көлік" },
    { image: "/assets/games/dog.png", alt: "Ит" },
    { image: "/assets/games/book.png", alt: "Кітап" },
    { image: "/assets/games/pen.png", alt: "Қалам" },
  ];

  const initializeCards = () => {
    const duplicatedImages = [...images, ...images];
    const shuffledCards = duplicatedImages
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        ...item,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
  };

  const startGame = () => {
    initializeCards();
    setGameStarted(true);
    let timer = 5;
    
    // Show all cards for 5 seconds
    setCards(prev => prev.map(card => ({ ...card, isFlipped: true })));
    
    const countdownInterval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);
      if (timer === 0) {
        clearInterval(countdownInterval);
        setCards(prev => prev.map(card => ({ ...card, isFlipped: false })));
      }
    }, 1000);
  };

  const handleCardClick = (clickedId: number) => {
    if (
      countdown > 0 || 
      cards[clickedId].isMatched || 
      isChecking || 
      cards[clickedId].isFlipped ||
      flippedCards.includes(clickedId)
    ) return;

    if (flippedCards.length === 1) {
      const firstCardId = flippedCards[0];
      const secondCardId = clickedId;

      if (firstCardId === secondCardId) return;

      setFlippedCards([...flippedCards, clickedId]);
      setCards(prev => prev.map(card => 
        card.id === secondCardId ? { ...card, isFlipped: true } : card
      ));

      setIsChecking(true);

      // Check if cards match
      if (cards[firstCardId].image === cards[secondCardId].image) {
        setCards(prev => prev.map(card => 
          (card.id === firstCardId || card.id === secondCardId)
            ? { ...card, isMatched: true }
            : card
        ));
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        // If cards don't match, flip them back after a delay
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            (card.id === firstCardId || card.id === secondCardId)
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    } else {
      setFlippedCards([clickedId]);
      setCards(prev => prev.map(card => 
        card.id === clickedId ? { ...card, isFlipped: true } : card
      ));
    }
  };

  // Check for game completion
  useEffect(() => {
    if (matchedPairs === images.length) {
      setSuccess(true);
      setShowModal(true);
    }
  }, [matchedPairs]);

  const handleRestart = () => {
    setShowModal(false);
    setGameStarted(false);
    setFlippedCards([]);
    setMatchedPairs(0);
    setCards([]);
    setCountdown(5);
  };

  return (
    <GameSectionLayout 
      title="Бірдей суретті тап" 
      backgroundImage="/assets/bg/4.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        <div className="grid grid-cols-4 gap-4 mt-6">
          {gameStarted ? (
            cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`border p-4 h-48 w-48 rounded-lg flex flex-col items-center cursor-pointer 
                  ${card.isFlipped || card.isMatched ? 'bg-white' : 'bg-gray-100'}`}
              >
                {(card.isFlipped || card.isMatched) && (
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={160}
                    height={160}
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
            ))
          ) : (
            Array(12).fill(null).map((_, index) => (
              <div
                key={index}
                className="border p-4 h-48 w-48 rounded-lg flex flex-col items-center cursor-pointer bg-gray-100"
              />
            ))
          )}
        </div>

        {!gameStarted ? (
          <button 
            onClick={startGame}
            className="bg-blue-500 text-white px-12 py-4 rounded-lg mt-6 text-4xl"
          >
            Ойынды бастау
          </button>
        ) : countdown > 0 ? (
          <div className="text-6xl font-bold text-white mt-6">{countdown}</div>
        ) : null}

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <GameModal success={success} onRestart={handleRestart} />
          </div>
        )}
      </div>
    </GameSectionLayout>
  );
}
