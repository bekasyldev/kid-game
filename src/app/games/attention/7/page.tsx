'use client'
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import { FaCircle, FaSquare, FaStar, FaHeart, FaBicycle, FaCar, FaPlus } from 'react-icons/fa';

interface Shape {
  id: number;
  icon: React.ReactNode;
  color: string;
}

export default function AttentionGameSeven() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userSequence, setUserSequence] = useState<Shape[]>([]);

  const shapes: Shape[] = [
    { id: 1, icon: <FaSquare size="4rem" />, color: "#4ade80" },
    { id: 2, icon: <FaCircle size="4rem" />, color: "#f87171" },
    { id: 3, icon: <FaStar size="4rem" />, color: "#a78bfa" },
    { id: 4, icon: <FaHeart size="4rem" />, color: "#f43f5e" },
    { id: 5, icon: <FaBicycle size="4rem" />, color: "#0ea5e9" },
    { id: 6, icon: <FaCar size="4rem" />, color: "#f97316" },
  ];

  // Define the three rows of the pattern
  const row1 = [shapes[0], shapes[1], shapes[2], shapes[0], null, null]; // Box Circle Star Box Empty Empty
  const row2 = [shapes[3], shapes[4], shapes[5], shapes[3], null, null]; // Heart Cycle Car Heart Empty Empty
  const row3 = [shapes[1], shapes[4], shapes[3], shapes[1], null, null]; // Circle Cycle Heart Circle Empty Empty

  // Define correct answers for each row
  const correctAnswers = {
    row1: [shapes[1].id, shapes[2].id], // Circle, Box
    row2: [shapes[4].id, shapes[5].id], // Cycle, Car
    row3: [shapes[4].id, shapes[3].id], // Cycle, Circle
  };

  const handleDragStart = (e: React.DragEvent, shape: Shape) => {
    e.dataTransfer.setData('shapeId', shape.id.toString());
  };

  const handleDrop = (e: React.DragEvent, rowIndex: number, position: number) => {
    e.preventDefault();
    const shapeId = parseInt(e.dataTransfer.getData('shapeId'));
    const droppedShape = shapes.find(s => s.id === shapeId);
    
    if (!droppedShape) return;

    // Check if the dropped shape matches the correct answer for this position
    const isCorrect = (rowIndex === 0 && correctAnswers.row1[position] === shapeId) ||
                     (rowIndex === 1 && correctAnswers.row2[position] === shapeId) ||
                     (rowIndex === 2 && correctAnswers.row3[position] === shapeId);

    if (isCorrect) {
      setUserSequence(prev => {
        const newSequence = [...prev];
        const sequenceIndex = rowIndex * 2 + position;
        newSequence[sequenceIndex] = droppedShape;
        
        // Check if all slots are filled correctly
        if (newSequence.filter(Boolean).length === 6) {
          setSuccess(true);
          setShowModal(true);
        }
        return newSequence;
      });
    } else {
      const slot = document.getElementById(`slot-${rowIndex}-${position}`);
      slot?.classList.add('shake');
      setTimeout(() => {
        slot?.classList.remove('shake');
      }, 500);
    }
  };

  const renderRow = (row: (Shape | null)[], rowIndex: number) => (
    <div className="grid grid-cols-6 gap-4">
      {row.map((shape, index) => (
        <div 
          key={index}
          id={`slot-${rowIndex}-${index % 2}`}
          className="w-24 h-24 border-2 rounded-lg flex items-center justify-center bg-white"
          onDrop={index >= 4 ? (e) => handleDrop(e, rowIndex, index - 4) : undefined}
          onDragOver={index >= 4 ? (e) => e.preventDefault() : undefined}
        >
          {index < 4 && shape ? (
            <div style={{ color: shape.color }}>{shape.icon}</div>
          ) : index >= 4 ? (
            userSequence[rowIndex * 2 + (index - 4)] ? (
              <div style={{ color: userSequence[rowIndex * 2 + (index - 4)].color }}>
                {userSequence[rowIndex * 2 + (index - 4)].icon}
              </div>
            ) : (
              <div className="w-full h-full border-2 border-dashed rounded-lg flex items-center justify-center">
                <FaPlus color="gray" size="2rem" />
              </div>
            )
          ) : null}
        </div>
      ))}
    </div>
  );

  return (
    <GameSectionLayout 
      title="Тізбекті жалғастыр" 
      backgroundImage="/assets/bg/7.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6 gap-8">
        {renderRow(row1, 0)}
        {renderRow(row2, 1)}
        {renderRow(row3, 2)}

        <div className="flex gap-4 flex-wrap justify-center max-w-3xl mt-8">
          {shapes.map((shape) => (
            <div
              key={shape.id}
              draggable
              onDragStart={(e) => handleDragStart(e, shape)}
              className="w-24 h-24 border-2 rounded-lg flex items-center justify-center bg-white cursor-move hover:border-blue-500 transition-colors"
            >
              <div style={{ color: shape.color }}>{shape.icon}</div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <GameModal success={success} onRestart={() => {
            setShowModal(false);
            setSuccess(false);
            setUserSequence([]);
          }} />
        </div>
      )}
    </GameSectionLayout>
  );
}
