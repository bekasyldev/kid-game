'use client'
import { useState, useEffect } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';

interface Letter {
  id: number;
  upper: string;
  lower: string;
}

export default function MemoryGameFive() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [matched, setMatched] = useState<boolean[]>(Array(6).fill(false));
  const [letters] = useState<Letter[]>([
    { id: 1, upper: 'А', lower: 'а' },
    { id: 2, upper: 'Ә', lower: 'ә' },
    { id: 3, upper: 'Б', lower: 'б' },
    { id: 4, upper: 'В', lower: 'в' },
    { id: 5, upper: 'Г', lower: 'г' },
    { id: 6, upper: 'Ғ', lower: 'ғ' },
  ]);

  const [shuffledUpperCase, setShuffledUpperCase] = useState<Letter[]>([]);
  const [shuffledLowerCase, setShuffledLowerCase] = useState<Letter[]>([]);

  useEffect(() => {
    shuffleLetters();
  }, []);

  const shuffleLetters = () => {
    setShuffledUpperCase([...letters].sort(() => Math.random() - 0.5));
    setShuffledLowerCase([...letters].sort(() => Math.random() - 0.5));
  };

  const handleDragStart = (e: React.DragEvent, letter: Letter) => {
    e.dataTransfer.setData('letter', JSON.stringify(letter));
  };

  const handleDrop = (e: React.DragEvent, targetLetter: Letter, index: number) => {
    e.preventDefault();
    const droppedLetter: Letter = JSON.parse(e.dataTransfer.getData('letter'));

    if (droppedLetter.id === targetLetter.id) {
      const element = document.getElementById(`letter-${index}`);
      element?.classList.add('correct-match');
      setMatched(prev => {
        const newMatched = [...prev];
        newMatched[index] = true;
        if (newMatched.every(m => m)) {
          setSuccess(true);
          setShowModal(true);
        }
        return newMatched;
      });
    } else {
      const element = document.getElementById(`letter-${index}`);
      element?.classList.add('shake');
      setTimeout(() => {
        element?.classList.remove('shake');
      }, 500);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setMatched(Array(6).fill(false));
    shuffleLetters();
  };

  return (
    <GameSectionLayout 
      title="Әріптерді сәйкестендір" 
      backgroundImage="/assets/bg/memory.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        <div className="grid grid-cols-3 gap-4 my-6">
          {shuffledLowerCase.map((letter, index) => (
            <div
              key={letter.id}
              id={`letter-${index}`}
              className="w-24 h-24 border p-4 rounded-lg flex flex-col justify-center items-center bg-white"
              onDrop={(e) => handleDrop(e, letter, index)}
              onDragOver={handleDragOver}
            >
              <p className="text-4xl">{letter.lower}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {shuffledUpperCase.map((letter) => (
            <div
              key={letter.id}
              draggable
              onDragStart={(e) => handleDragStart(e, letter)}
              className="w-24 h-24 border p-4 rounded-lg text-4xl font-bold cursor-pointer bg-white flex justify-center items-center"
            >
              {letter.upper}
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
        .correct-match {
          background-color: #ecfdf5;
          border-color: #34d399;
        }
        
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