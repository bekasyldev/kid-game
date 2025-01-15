'use client'
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import Image from 'next/image';
import GameModal from '@/app/components/GameModal';

interface Card {
  id: number;
  image: string;
  alt: string;
}

interface Row {
  id: number;
  cards: Card[];
}

export default function MemoryGameThree() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showingPattern, setShowingPattern] = useState(false);
  const [correctRowId, setCorrectRowId] = useState<number | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [shuffledRows, setShuffledRows] = useState<Row[]>([]);

  const rows: Row[] = [
    {
      id: 1,
      cards: [
        { id: 1, image: "/assets/games/apple.png", alt: "Алма" },
        { id: 2, image: "/assets/games/banana.png", alt: "Банан" },
        { id: 3, image: "/assets/games/pencil.png", alt: "Қалам" },
        { id: 4, image: "/assets/games/pen.png", alt: "Қалам" },
        { id: 5, image: "/assets/games/car.png", alt: "Көлік" },
      ]
    },
    {
      id: 2,
      cards: [
        { id: 6, image: "/assets/games/cat.png", alt: "Мысық" },
        { id: 7, image: "/assets/games/dog.png", alt: "Ит" },
        { id: 8, image: "/assets/games/rabbit.png", alt: "Қоян" },
        { id: 9, image: "/assets/games/crocodile.webp", alt: "Крокодил" },
        { id: 10, image: "/assets/games/tiger.png", alt: "Жолбарыс" },
      ]
    },
    {
      id: 3,
      cards: [
        { id: 11, image: "/assets/games/car.png", alt: "Көлік" },
        { id: 12, image: "/assets/games/book.png", alt: "Кітап" },
        { id: 13, image: "/assets/games/pen.png", alt: "Қалам" },
        { id: 14, image: "/assets/games/pencil.png", alt: "Қалам" },
        { id: 15, image: "/assets/games/cat.png", alt: "Мысық" },
      ]
    },
  ];

  const shuffleRows = () => {
    return [...rows].sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowingPattern(true);
    const shuffled = shuffleRows();
    setShuffledRows(shuffled);
    const randomRow = shuffled[Math.floor(Math.random() * shuffled.length)];
    setCorrectRowId(randomRow.id);
    
    setTimeout(() => {
      setShowingPattern(false);
    }, 5000);
  };

  const handleRowClick = (rowId: number) => {
    if (!showingPattern && correctRowId !== null) {
      setSelectedRowId(rowId);
      const isCorrect = rowId === correctRowId;
      setSuccess(isCorrect);
      setTimeout(() => {
        setShowModal(true);
      }, 500); // Short delay to show the color change
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setGameStarted(false);
    setShowingPattern(false);
    setCorrectRowId(null);
    setSelectedRowId(null);
    setSuccess(false);
    setShuffledRows([]);
  };

  return (
    <GameSectionLayout 
      title="Дұрыс қатарды тап" 
      backgroundImage="/assets/bg/memory.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        {!gameStarted ? (
          <button 
            onClick={startGame}
            className="bg-blue-500 text-white px-12 py-4 rounded-lg mt-6 text-4xl"
          >
            Ойынды бастау
          </button>
        ) : (
          <>
            {/* Pattern display during memorization */}
            {showingPattern && correctRowId && (
              <div className="grid grid-cols-5 gap-4 bg-white p-6 rounded-lg">
                {rows.find(r => r.id === correctRowId)?.cards.map((card) => (
                  <div key={card.id} className="flex flex-col items-center">
                    <Image 
                      src={card.image} 
                      alt={card.alt} 
                      width={100} 
                      height={100} 
                      className="object-contain"
                    />
                    <p className="mt-2 font-medium">{card.alt}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Row choices after memorization */}
            {!showingPattern && (
              <div className="flex flex-col gap-6 w-full">
                {shuffledRows.map((row) => (
                  <div
                    key={row.id}
                    onClick={() => handleRowClick(row.id)}
                    className={`grid grid-cols-5 gap-4 bg-white p-6 rounded-lg cursor-pointer transition-all
                      ${selectedRowId === row.id ? 
                        (success ? 'bg-green-100' : 'animate-shake bg-red-100') : 
                        'hover:bg-gray-50'}`}
                  >
                    {row.cards.map((card) => (
                      <div key={card.id} className="flex flex-col items-center">
                        <Image 
                          src={card.image} 
                          alt={card.alt} 
                          width={100} 
                          height={100} 
                          className="object-contain"
                        />
                        <p className="mt-2 font-medium">{card.alt}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <GameModal success={success} onRestart={handleRestart} />
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </GameSectionLayout>
  );
}
