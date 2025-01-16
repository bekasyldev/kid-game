'use client'
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import Image from 'next/image';
import GameModal from '@/app/components/GameModal';

interface Word {
  id: number;
  image: string;
  alt: string;
  word: string;
  missingIndexes: number[];
}

interface Inputs {
  [key: number]: { [key: number]: string };
}

export default function ThinkingGameTwo() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [words, setWords] = useState<Word[]>([
    { id: 1, image: "/assets/games/tree.png", alt: "Ағаш", word: "Ағаш", missingIndexes: [2] },
    { id: 2, image: "/assets/games/clock.png", alt: "Сағат", word: "Сағат", missingIndexes: [4] },
    { id: 3, image: "/assets/games/dog.png", alt: "Ит", word: "Ит", missingIndexes: [0] },
    { id: 4, image: "/assets/games/crocodile.webp", alt: "Қолтырауын", word: "Қолтырауын", missingIndexes: [2, 3, 5] },
    { id: 5, image: "/assets/games/car.png", alt: "Көлік", word: "Көлік", missingIndexes: [4] },
    { id: 6, image: "/assets/games/sunflower.webp", alt: "Күнбағыс", word: "Күнбағыс", missingIndexes: [4, 6] },
    { id: 7, image: "/assets/games/bird.png", alt: "Құс", word: "Құс", missingIndexes: [0] },
    { id: 8, image: "/assets/games/camel.png", alt: "Түйе", word: "Түйе", missingIndexes: [3, 4] },
    { id: 9, image: "/assets/games/duck.png", alt: "Үйрек", word: "Үйрек", missingIndexes: [2, 4] },
  ]);

  const [inputs, setInputs] = useState<Inputs>({});

  const handleInputChange = (wordId: number, index: number, value: string) => {
    setInputs(prev => ({
      ...prev,
      [wordId]: {
        ...prev[wordId],
        [index]: value.toLowerCase(),
      },
    }));

    // Check if all inputs for this word are correct
    const word = words.find(w => w.id === wordId);
    if (word) {
      const wordInputs = inputs[wordId] || {};
      const isComplete = word.missingIndexes.every(idx => {
        const expectedLetter = word.word[idx].toLowerCase();
        return wordInputs[idx] === expectedLetter;
      });

      if (isComplete) {
        const element = document.getElementById(`word-${wordId}`);
        element?.classList.add('correct-answer');
      }

      // Check if all words are complete
      const allComplete = words.every(w => {
        const wordInputs = inputs[w.id] || {};
        return w.missingIndexes.every(idx => {
          const expectedLetter = w.word[idx].toLowerCase();
          return wordInputs[idx] === expectedLetter;
        });
      });

      if (allComplete) {
        setSuccess(true);
        setShowModal(true);
      }
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setInputs({});
    // Shuffle missing indexes for each word
    setWords(prev => prev.map(word => {
      const wordLength = word.word.length;
      const newMissingCount = Math.floor(Math.random() * 2) + 1; // 1 or 2 missing letters
      const newMissingIndexes = Array.from({ length: wordLength }, (_, i) => i)
        .sort(() => Math.random() - 0.5)
        .slice(0, newMissingCount);
      return { ...word, missingIndexes: newMissingIndexes };
    }).sort(() => Math.random() - 0.5));
    
    // Remove all correct-answer classes
    words.forEach(word => {
      const element = document.getElementById(`word-${word.id}`);
      element?.classList.remove('correct-answer');
    });
  };

  return (
    <GameSectionLayout 
      title="Жоғалған әріптер" 
      backgroundImage="/assets/bg/2.jpg"
      darkHeader
    >
      <div className="grid grid-cols-3 gap-6 mt-6">
        {words.map((word) => (
          <div 
            key={word.id}
            id={`word-${word.id}`}
            className="border p-4 rounded-lg flex flex-col items-center bg-white shadow-md"
          >
            <Image
              src={word.image}
              alt={word.alt}
              width={96}
              height={96}
              className="h-24 w-24 object-contain mb-4"
            />
            <div className="flex gap-2">
              {word.word.split('').map((letter, index) => (
                word.missingIndexes.includes(index) ? (
                  <input
                    key={index}
                    maxLength={1}
                    className="w-8 h-8 text-center border rounded bg-white"
                    value={inputs[word.id]?.[index] || ''}
                    onChange={(e) => handleInputChange(word.id, index, e.target.value)}
                  />
                ) : (
                  <span key={index} className="text-xl font-bold">
                    {letter}
                  </span>
                )
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <GameModal success={success} onRestart={handleRestart} />
        </div>
      )}
    </GameSectionLayout>
  );
}
