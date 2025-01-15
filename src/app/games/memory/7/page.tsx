'use client'

import { useState, useEffect } from 'react';
import GameSectionLayout from '@/app/components/GameSectionLayout';
import GameModal from '@/app/components/GameModal';

interface Word {
  id: number;
  text: string;
  vowel: string;
}

export default function MemoryGameSeven() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [words] = useState<Word[]>([
    { id: 1, text: "Арғымақ", vowel: "А" },
    { id: 2, text: "Әке", vowel: "Ә" },
    { id: 3, text: "Үлгі", vowel: "Ү" },
    { id: 4, text: "Әнші", vowel: "Ә" },
    { id: 5, text: "Ұстаз", vowel: "Ұ" },
    { id: 6, text: "Өткір", vowel: "Ө" },
    { id: 7, text: "Өсу", vowel: "Ө" },
    { id: 8, text: "Ұста", vowel: "Ұ" },
    { id: 9, text: "Әлем", vowel: "Ә" },
    { id: 10, text: "Үрлеу", vowel: "Ү" },
  ]);

  const [visibleWords, setVisibleWords] = useState<Word[]>([]);
  const [matchedWords, setMatchedWords] = useState<Word[]>([]);

  const shuffleWords = (words: Word[]) => {
    return words.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Shuffle and set visible words at the start
    setVisibleWords(shuffleWords([...words]));
  }, [words]);

  const handleDragStart = (e: React.DragEvent, word: Word) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(word));
  };

  const handleDrop = (e: React.DragEvent, vowel: string) => {
    e.preventDefault();
    const droppedWord: Word = JSON.parse(e.dataTransfer.getData('text/plain'));

    if (droppedWord.vowel === vowel) {
      setMatchedWords(prev => {
        const newMatched = [...prev, droppedWord];
        // Check if all words are matched
        if (newMatched.length === words.length) {
          setSuccess(true);
          setShowModal(true);
        }
        return newMatched;
      });
      setVisibleWords(prev => prev.filter(word => word.id !== droppedWord.id));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setMatchedWords([]);
    setVisibleWords(shuffleWords([...words])); // Shuffle words on restart
  };

  return (
    <GameSectionLayout 
      title="Сөздерді орналастыр" 
      backgroundImage="/assets/bg/memory.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        <div className="grid grid-cols-4 gap-4 my-6 w-full">
          {['А', 'Ә', 'О', 'Ө', 'Ұ', 'Ү', 'И', 'У'].map((vowel, index) => (
            <div 
              key={index} 
              className="min-h-[200px] p-4 rounded-lg flex flex-col items-center transition-all duration-300"
              style={{
                backgroundColor: [
                  '#ffedd5', '#fee2e2', '#fef3c7', '#ecfccb',
                  '#f0fdf4', '#f0f9ff', '#faf5ff', '#fdf4ff'
                ][index],
                minWidth: '200px',
              }}
              onDrop={(e) => handleDrop(e, vowel)} 
              onDragOver={handleDragOver}
            >
              <p className="text-2xl font-bold mb-4">{vowel}</p>
              <div className="flex flex-col gap-2 w-full">
                {matchedWords.filter(word => word.vowel === vowel).map(word => (
                  <p key={word.id} className="text-lg p-2 bg-white/50 rounded text-center">
                    {word.text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {visibleWords.map((word) => (
            <div
              key={word.id}
              draggable
              onDragStart={(e) => handleDragStart(e, word)}
              className="border p-4 rounded-lg text-lg font-bold cursor-pointer bg-white flex justify-center items-center"
            >
              {word.text}
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