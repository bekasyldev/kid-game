'use client'

import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import Image from 'next/image';
interface Hotspot {
  id: number;
  x: number;  // percentage from left
  y: number;  // percentage from top
  found: boolean;
}

export default function AttentionGameFour() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hotspots, setHotspots] = useState<Hotspot[]>([
    { id: 1, x: 10.5556, y: 2.92826, found: false },
    { id: 2, x: 3.51852, y: 36.6032, found: false },
    { id: 3, x: 23.3333, y: 26.94, found: false },
    { id: 4, x: 41.1111, y: 18.3016, found: false },
    { id: 5, x: 15, y: 31.3324, found: false },
    { id: 6, x: 33.5185, y: 37.7745, found: false },
    { id: 7, x: 53.8889, y: 26.5007, found: false },
    { id: 8, x: 75.9259, y: 31.0395, found: false },
    { id: 9, x: 91.4815, y: 11.713, found: false },
    { id: 10, x: 35.5556, y: 7.32064, found: false },
  ]);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Check if click is near any hotspot
    hotspots.forEach((hotspot, index) => {
      const distance = Math.sqrt(
        Math.pow(x - hotspot.x, 2) + 
        Math.pow(y - hotspot.y, 2)
      );

      if (distance < 5 && !hotspot.found) { // 5% radius for detection
        setHotspots(prev => {
          const newHotspots = [...prev];
          newHotspots[index] = { ...hotspot, found: true };
          
          // Check if all hotspots are found
          if (newHotspots.every(h => h.found)) {
            setSuccess(true);
            setShowModal(true);
          }
          
          return newHotspots;
        });
      }
    });
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setHotspots(prev => prev.map(h => ({ ...h, found: false })));
  };

  return (
    <GameSectionLayout 
      title="Суретті ізде" 
      backgroundImage="/assets/bg/memory.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        <div 
          className="relative w-full max-w-4xl cursor-pointer"
          onClick={handleImageClick}
        >
          <Image
            width={1000}
            height={1000}
            src="/assets/games/difference.jpg" 
            alt="Find the differences"
            className="w-full h-auto"
          />
          
          {/* Hotspots */}
          {hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className={`absolute w-[7.40741%] h-[5.85652%] rounded-full border-2 
                ${hotspot.found ? 'border-green-500 bg-green-200/50' : 'border-transparent'}`}
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Found counter */}
        <div className="mt-4 text-xl font-bold">
          Табылған айырмашылықтар: {hotspots.filter(h => h.found).length} / {hotspots.length}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <GameModal success={success} onRestart={handleRestart} />
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.5; }
        }
        .hotspot-found {
          animation: pulse 1s ease-in-out;
        }
      `}</style>
    </GameSectionLayout>
  );
}