'use client'
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import { FaCircle, FaSquare, FaStar } from 'react-icons/fa';

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
  ];

  // First 3 shapes are different, next 3 match the pattern
  const patternSequence: Shape[] = [
    shapes[0], // Square
    shapes[1], // Circle
    shapes[2], // Star
    shapes[0], // Square (matches first)
    shapes[1], // Circle (matches second)
    shapes[2], // Star (matches third)
  ];

  const handleDragStart = (e: React.DragEvent, shape: Shape) => {
    e.dataTransfer.setData('shapeId', shape.id.toString());
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const shapeId = parseInt(e.dataTransfer.getData('shapeId'));
    const droppedShape = shapes.find(s => s.id === shapeId);
    
    if (!droppedShape) return;

    // Check if the dropped shape matches the pattern
    if (droppedShape.id === patternSequence[index].id) {
      const slot = document.getElementById(`slot-${index}`);
      slot?.classList.add('correct-match');
      
      setUserSequence(prev => {
        const newSequence = [...prev];
        newSequence[index - 3] = droppedShape; // Adjust index for the empty slots
        
        // Check if all three slots are filled correctly
        if (newSequence.filter(Boolean).length === 3) {
          setSuccess(true);
          setShowModal(true);
        }
        return newSequence;
      });
    } else {
      const slot = document.getElementById(`slot-${index}`);
      slot?.classList.add('shake');
      setTimeout(() => {
        slot?.classList.remove('shake');
      }, 500);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setUserSequence([]);
  };

  return (
    <GameSectionLayout 
      title="Тізбекті жалғастыр" 
      backgroundImage="/assets/bg/memory.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        <div className="grid grid-cols-6 gap-4 mb-12">
          {/* First 3 shapes (fixed pattern) */}
          {patternSequence.slice(0, 3).map((shape, index) => (
            <div 
              key={index}
              className="w-24 h-24 border-2 rounded-lg flex items-center justify-center bg-white"
            >
              <div style={{ color: shape.color }}>{shape.icon}</div>
            </div>
          ))}

          {/* Next 3 slots (for user to fill) */}
          {[3, 4, 5].map((index) => (
            <div 
              key={index}
              id={`slot-${index}`}
              className="w-24 h-24 border-2 rounded-lg flex items-center justify-center bg-white"
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}
            >
              {userSequence[index - 3] ? (
                <div style={{ color: userSequence[index - 3].color }}>
                  {userSequence[index - 3].icon}
                </div>
              ) : (
                <div className="w-full h-full border-2 border-dashed rounded-lg" />
              )}
            </div>
          ))}
        </div>

        {/* Available shapes for dragging */}
        <div className="flex gap-4">
          {shapes.map((shape, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, shape)}
              className="w-24 h-24 border-2 rounded-lg flex items-center justify-center bg-white cursor-move"
            >
              <div style={{ color: shape.color }}>
                {shape.icon}
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
