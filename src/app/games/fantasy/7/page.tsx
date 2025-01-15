'use client'
import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';

interface Item {
  id: number;
  color: string;
  bgColor: string;
}

export default function FantasyGameSeven() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userSequence, setUserSequence] = useState<Item[]>([]);

  const items: Item[] = [
    { id: 1, color: 'green', bgColor: 'bg-green-500' },
    { id: 2, color: 'red', bgColor: 'bg-red-500' },
    { id: 3, color: 'blue', bgColor: 'bg-blue-500' },
  ];

  // Create three rows of patterns
  const rowPatterns = [
    [items[0], items[1], items[2], items[0]], // First row
    [items[1], items[2], items[0], items[1]], // Second row
    [items[2], items[0], items[1], items[2]], // Third row
  ];

  const handleDragStart = (e: React.DragEvent, item: Item) => {
    e.dataTransfer.setData('itemId', item.id.toString());
  };

  const handleDrop = (e: React.DragEvent, rowIndex: number) => {
    e.preventDefault();
    const itemId = parseInt(e.dataTransfer.getData('itemId'));
    const droppedItem = items.find(i => i.id === itemId);
    
    if (!droppedItem) return;

    // Check if the dropped item matches the pattern for this row
    if (droppedItem.id === rowPatterns[rowIndex][3].id) {
      setUserSequence(prev => {
        const newSequence = [...prev];
        newSequence[rowIndex] = droppedItem;
        
        // Check if all three rows are complete
        if (newSequence.filter(Boolean).length === 3) {
          setSuccess(true);
          setShowModal(true);
        }
        return newSequence;
      });
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setUserSequence([]);
  };

  return (
    <GameSectionLayout 
      title="Тізбекті жалғастыр" 
      backgroundImage="/assets/bg/fantasy.webp"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        {/* Pattern rows */}
        <div className="flex flex-col gap-8 mb-12">
          {rowPatterns.map((pattern, rowIndex) => (
            <div key={rowIndex} className="flex gap-4">
              {/* Show first 3 items */}
              {pattern.slice(0, 3).map((item, index) => (
                <div 
                  key={index}
                  className="w-32 h-32 rounded-lg flex items-center justify-center"
                >
                  <div className={`w-full h-full rounded-lg ${item.bgColor}`}></div>
                </div>
              ))}

              {/* Empty slot for matching */}
              <div 
                className="w-32 h-32 bg-white rounded-lg flex items-center justify-center border-2 border-dashed"
                onDrop={(e) => handleDrop(e, rowIndex)}
                onDragOver={(e) => e.preventDefault()}
              >
                {userSequence[rowIndex] && (
                  <div className={`w-full h-full rounded-lg ${userSequence[rowIndex].bgColor}`}></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Available items for dragging */}
        <div className="flex gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="w-32 h-32 bg-white rounded-lg flex items-center justify-center cursor-move hover:shadow-lg transition-shadow"
            >
              <div className={`w-full h-full rounded-lg ${item.bgColor}`}></div>
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
