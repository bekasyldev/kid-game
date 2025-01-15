'use client'
import { useState, useEffect } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import { FaCircle, FaHeart, FaStar, FaSquare } from 'react-icons/fa';
import GameModal from '@/app/components/GameModal';

interface Shape {
  id: number;
  icon: React.ReactNode;
  color: string;
}

export default function MemoryGameTwo() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showingSequence, setShowingSequence] = useState(true);
  const [missingShape, setMissingShape] = useState<Shape | null>(null);
  
  const shapes: Shape[] = [
    { id: 1, icon: <FaCircle size="8rem" />, color: "rgb(110, 225, 121)" },
    { id: 2, icon: <FaHeart size="8rem" />, color: "red" },
    { id: 3, icon: <FaHeart size="8rem" />, color: "red" },
    { id: 4, icon: <FaCircle size="8rem" />, color: "rgb(110, 225, 121)" },
    { id: 5, icon: <FaStar size="8rem" />, color: "yellow" },
    { id: 6, icon: <FaStar size="8rem" />, color: "yellow" },
    { id: 7, icon: <FaSquare size="8rem" />, color: "rgb(98, 200, 243)" },
    { id: 8, icon: <FaSquare size="8rem" />, color: "rgb(98, 200, 243)" },
  ];

  const [visibleShapes, setVisibleShapes] = useState<Shape[]>(shapes);
  const [bottomShapes, setBottomShapes] = useState<Shape[]>([]);

  useEffect(() => {
    if (showingSequence) {
      const timer = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * shapes.length);
        const removedShape = shapes[randomIndex];
        setMissingShape(removedShape);
        
        // Create new array with the missing shape replaced by null
        const newShapes = [...shapes];
        newShapes[randomIndex] = { id: 0, icon: null, color: '' };
        setVisibleShapes(newShapes);
        
        setShowingSequence(false);

        // Set up bottom shapes
        const uniqueShapes = Array.from(new Set(shapes.map(s => s.color)))
          .map(color => shapes.find(s => s.color === color)!);
        setBottomShapes(uniqueShapes);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showingSequence]);

  const handleDragStart = (e: React.DragEvent, shape: Shape) => {
    e.dataTransfer.setData('shapeId', shape.id.toString());
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const shapeId = parseInt(e.dataTransfer.getData('shapeId'));
    const droppedShape = shapes.find(s => s.id === shapeId);
    
    if (droppedShape && missingShape && droppedShape.color === missingShape.color) {
      setSuccess(true);
      setShowModal(true);
    } else {
      const element = document.getElementById('empty-slot');
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
    setShowingSequence(true);
    setVisibleShapes(shapes);
    setMissingShape(null);
    setBottomShapes([]);
  };

  return (
    <GameSectionLayout 
      title="Жоғалған фигураны тап" 
      backgroundImage="/assets/bg/memory.jpg"
      darkHeader
    >
      <section className="h-full flex flex-col justify-center gap-10">
        <section className="w-full rounded-2xl">
          <section className="bg-black/50 py-8 rounded-2xl">
            <ul className="grid grid-cols-4 gap-y-10 mt-10">
              {visibleShapes.map((shape, index) => (
                <li key={index} className="flex flex-col items-center">
                  {shape ? (
                    <div style={{ color: shape.color }}>
                      {shape.icon}
                    </div>
                  ) : (
                    <div 
                      id="empty-slot"
                      className="w-32 h-32 border-2 border-dashed rounded-lg"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    />
                  )}
                </li>
              ))}
            </ul>
          </section>

          {!showingSequence && (
            <ul className="grid grid-cols-4 gap-4 mt-20 bg-black/50 py-8 rounded-2xl">
              {bottomShapes.map((shape, index) => (
                <li 
                  key={index} 
                  className="flex flex-col items-center cursor-pointer"
                  draggable
                  onDragStart={(e) => handleDragStart(e, shape)}
                >
                  <div style={{ color: shape.color }}>
                    {shape.icon}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <GameModal success={success} onRestart={handleRestart} />
        </div>
      )}
    </GameSectionLayout>
  );
}
