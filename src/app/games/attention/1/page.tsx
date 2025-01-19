'use client'

import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import Image from 'next/image';

interface ImageSet {
  id: number;
  src: string;
  alt: string;
  isOddOne: boolean;
}

export default function AttentionGameOne() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [correctRows, setCorrectRows] = useState<number[]>([]);

  const imageSets = [
    // Row 1
    [
      { id: 1, src: '/assets/games/broccoli.png', alt: 'Брокколи', isOddOne: true },
      { id: 2, src: '/assets/games/strawberry.png', alt: 'Құлпынай', isOddOne: false },
      { id: 3, src: '/assets/games/orange.jpg', alt: 'Апельсин', isOddOne: false },
      { id: 4, src: '/assets/games/apple.png', alt: 'Алма', isOddOne: false },
    ],
    // Row 2
    [
      { id: 5, src: '/assets/games/car.png', alt: 'Автомобиль', isOddOne: false },
      { id: 6, src: '/assets/games/plane.jpg', alt: 'Ұшақ', isOddOne: true },
      { id: 7, src: '/assets/games/bicycle.png', alt: 'Велосипед', isOddOne: false },
      { id: 8, src: '/assets/games/bus.webp', alt: 'Автобус', isOddOne: false },
    ],
    // Row 3
    [
      { id: 9, src: '/assets/games/bird.png', alt: 'Құс', isOddOne: true },
      { id: 10, src: '/assets/games/cat.png', alt: 'Мысық', isOddOne: false },
      { id: 11, src: '/assets/games/dog.png', alt: 'Ит', isOddOne: false },
      { id: 12, src: '/assets/games/rabbit.png', alt: 'Қоян', isOddOne: false },
    ],
  ];

  const handleImageClick = (imageId: number, isOddOne: boolean, rowIndex: number) => {
    // Add or remove from selected images
    if (selectedImages.includes(imageId)) {
      setSelectedImages(prev => prev.filter(id => id !== imageId));
      setCorrectRows(prev => prev.filter(row => row !== rowIndex));
    } else {
      setSelectedImages(prev => [...prev, imageId]);
      
      if (isOddOne) {
        setCorrectRows(prev => [...prev, rowIndex]);
        
        // Check if all rows are correct
        if (correctRows.length === 2) { // We need 3 correct rows (0, 1, 2)
          setTimeout(() => {
            setSuccess(true);
            setShowModal(true);
          }, 500);
        }
      }
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setSelectedImages([]);
    setCorrectRows([]);
  };

  return (
    <GameSectionLayout 
      title="Артық суретті тап" 
      backgroundImage="/assets/bg/1.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6 gap-8">
        {imageSets.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className={`flex gap-6 p-4 rounded-xl transition-all
              ${correctRows.includes(rowIndex) ? 'bg-green-100' : ''}`}
          >
            {row.map((image) => (
              <div
                key={image.id}
                onClick={() => handleImageClick(image.id, image.isOddOne, rowIndex)}
                className={`w-48 h-48 bg-white rounded-lg p-4 flex items-center justify-center cursor-pointer
                  ${selectedImages.includes(image.id) && image.isOddOne ? 'bg-green-100' : ''}
                  ${selectedImages.includes(image.id) && !image.isOddOne ? 'bg-red-100' : ''}
                  hover:shadow-lg transition-all`}
              >
                <Image 
                  src={image.src} 
                  alt={image.alt}
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </div>
            ))}
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