'use client'
import { useState, useRef, useEffect } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import Image from 'next/image';

interface Word {
  id: number;
  image: string;
  word: string;
}

export default function FantasyGameFour() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [activeWordId, setActiveWordId] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const words: Word[] = [
    { id: 1, image: '/assets/rebus/car.png', word: 'КӨЛІК' },
    { id: 2, image: '/assets/rebus/tree.png', word: 'АҒАШ' },
    { id: 3, image: '/assets/rebus/apple.png', word: 'АЛМА' },
    { id: 4, image: '/assets/rebus/pen.png', word: 'ҚАЛАМ' },
  ];

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeWordId]);

  const handleInputChange = (wordId: number, value: string) => {
    const upperValue = value.toUpperCase();
    setUserAnswers(prev => ({ ...prev, [wordId]: upperValue }));

    const word = words.find(w => w.id === wordId);
    if (word && upperValue === word.word) {
      // Move to next word if current is correct
      const nextWord = words.find(w => w.id > wordId);
      if (nextWord) {
        setActiveWordId(nextWord.id);
      } else {
        // Check if all words are complete and correct
        const allComplete = words.every(w => userAnswers[w.id] === w.word);
        if (allComplete) {
          setSuccess(true);
          setShowModal(true);
        }
      }
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setUserAnswers({});
    setActiveWordId(1);
  };

  return (
    <GameSectionLayout 
      title="Ребус" 
      backgroundImage="/assets/bg/fantasy.webp"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        <div className="grid grid-cols-2 gap-8">
          {words.map((word) => (
            <div 
              key={word.id}
              className={`bg-white rounded-lg p-4 ${
                userAnswers[word.id] === word.word ? 'border-4 border-green-500' : ''
              }`}
              onClick={() => setActiveWordId(word.id)}
            >
              {/* Image */}
              <div className="w-48 h-48 mx-auto mb-4">
                <Image 
                  src={word.image}
                  alt={word.word}
                  width={200}
                  height={200}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Input field */}
              <div className="flex justify-center">
                <input
                  ref={word.id === activeWordId ? inputRef : null}
                  type="text"
                  value={userAnswers[word.id] || ''}
                  onChange={(e) => handleInputChange(word.id, e.target.value)}
                  className={`w-full text-center text-2xl font-bold p-2 border-2 rounded
                    ${word.id === activeWordId ? 'border-blue-500' : 'border-gray-200'}
                    ${userAnswers[word.id] === word.word ? 'bg-green-100' : 'bg-white'}`}
                  placeholder="Жауабыңызды теріңіз"
                />
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