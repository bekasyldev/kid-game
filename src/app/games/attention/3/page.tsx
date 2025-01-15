'use client'
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import { FaCircle, FaSquare, FaStar, FaHeart } from 'react-icons/fa';

interface SequenceItem {
  id: number;
  icon: React.ReactNode;
  color: string;
  size: string;
}

interface Sequence {
  id: number;
  pattern: SequenceItem[];
  options: {
    id: number;
    icon: React.ReactNode;
    color: string;
    size: string;
    isCorrect: boolean;
  }[];
}

export default function AttentionGameThree() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentSequence, setCurrentSequence] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const sequences: Sequence[] = [
    {
      id: 1,
      pattern: [
        { id: 1, icon: <FaCircle />, color: "#4ade80", size: "2rem" },
        { id: 2, icon: <FaCircle />, color: "#4ade80", size: "3rem" },
        { id: 3, icon: <FaCircle />, color: "#4ade80", size: "4rem" },
      ],
      options: [
        { id: 1, icon: <FaCircle />, color: "#4ade80", size: "5rem", isCorrect: true },
        { id: 2, icon: <FaSquare />, color: "#f87171", size: "4rem", isCorrect: false },
        { id: 3, icon: <FaStar />, color: "#fbbf24", size: "4rem", isCorrect: false },
      ]
    },
    {
      id: 2,
      pattern: [
        { id: 1, icon: <FaHeart />, color: "#f87171", size: "4rem" },
        { id: 2, icon: <FaSquare />, color: "#f87171", size: "4rem" },
        { id: 3, icon: <FaHeart />, color: "#f87171", size: "4rem" },
      ],
      options: [
        { id: 1, icon: <FaCircle />, color: "#4ade80", size: "4rem", isCorrect: false },
        { id: 2, icon: <FaSquare />, color: "#f87171", size: "4rem", isCorrect: true },
        { id: 3, icon: <FaStar />, color: "#fbbf24", size: "4rem", isCorrect: false },
      ]
    },
    // Add more sequences as needed
  ];

  const handleDragStart = (e: React.DragEvent, optionId: number) => {
    e.dataTransfer.setData('optionId', optionId.toString());
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const optionId = parseInt(e.dataTransfer.getData('optionId'));
    const option = sequences[currentSequence].options.find(opt => opt.id === optionId);

    if (option?.isCorrect) {
      setSelectedOption(optionId);

      if (currentSequence < sequences.length - 1) {
        setTimeout(() => {
          setCurrentSequence(prev => prev + 1);
          setSelectedOption(null);
        }, 1000);
      } else {
        setSuccess(true);
        setShowModal(true);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setCurrentSequence(0);
    setSelectedOption(null);
  };

  return (
    <GameSectionLayout 
      title="Келесі не" 
      backgroundImage="/assets/bg/memory.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        {/* Pattern sequence */}
        <div className="flex gap-4 mb-12">
          {sequences[currentSequence].pattern.map((item) => (
            <div
              key={item.id}
              className="w-32 h-32 bg-white rounded-lg flex items-center justify-center"
            >
              <div style={{ color: item.color, fontSize: item.size }}>
                {item.icon}
              </div>
            </div>
          ))}

          {/* Drop zone */}
          <div
            className="w-32 h-32 bg-white rounded-lg flex items-center justify-center border-2 border-dashed"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {selectedOption && (
              <div style={{ 
                color: sequences[currentSequence].options.find(opt => opt.id === selectedOption)?.color,
                fontSize: sequences[currentSequence].options.find(opt => opt.id === selectedOption)?.size
              }}>
                {sequences[currentSequence].options.find(opt => opt.id === selectedOption)?.icon}
              </div>
            )}
          </div>
        </div>

        {/* Options */}
        <div className="flex gap-4">
          {sequences[currentSequence].options.map((option) => (
            <div
              key={option.id}
              draggable
              onDragStart={(e) => handleDragStart(e, option.id)}
              className="w-24 h-24 bg-white rounded-lg flex items-center justify-center cursor-move hover:shadow-lg transition-shadow"
            >
              <div style={{ color: option.color, fontSize: option.size }}>
                {option.icon}
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
