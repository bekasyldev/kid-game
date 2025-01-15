'use client'

import { useState } from 'react';
import GameSectionLayout from "@/app/components/GameSectionLayout";
import GameModal from '@/app/components/GameModal';
import Image from 'next/image';

interface ImageSet {
  id: number;
  images: {
    id: number;
    src: string;
    alt: string;
    isOddOne: boolean;
  }[];
}

export default function AttentionGameOne() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentSet, setCurrentSet] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const imageSets: ImageSet[] = [
    {
      id: 1,
      images: [
        { id: 1, src: '/assets/games/cat.png', alt: 'Мысық', isOddOne: false },
        { id: 2, src: '/assets/games/dog.png', alt: 'Ит', isOddOne: false },
        { id: 3, src: '/assets/games/rabbit.png', alt: 'Қоян', isOddOne: false },
        { id: 4, src: '/assets/games/apple.png', alt: 'Алма', isOddOne: true },
      ]
    },
    {
      id: 2,
      images: [
        { id: 1, src: '/assets/games/apple.png', alt: 'Алма', isOddOne: false },
        { id: 2, src: '/assets/games/banana.png', alt: 'Банан', isOddOne: false },
        { id: 3, src: '/assets/games/cat.png', alt: 'Мысық', isOddOne: true },
        { id: 4, src: '/assets/games/orange.jpg', alt: 'Апельсин', isOddOne: false },
      ]
    },
    // Add more sets as needed
  ];

  const handleImageClick = (imageId: number, isOddOne: boolean) => {
    setSelectedImage(imageId);

    if (isOddOne) {
      // Correct choice
      if (currentSet < imageSets.length - 1) {
        setTimeout(() => {
          setCurrentSet(prev => prev + 1);
          setSelectedImage(null);
        }, 1000);
      } else {
        setSuccess(true);
        setShowModal(true);
      }
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setSuccess(false);
    setCurrentSet(0);
    setSelectedImage(null);
  };

  return (
    <GameSectionLayout 
      title="Артық суретті тап" 
      backgroundImage="/assets/bg/memory.jpg"
      darkHeader
    >
      <div className="flex flex-col items-center p-6">
        <div className="flex gap-6">
          {imageSets[currentSet].images.map((image) => (
            <div
              key={image.id}
              onClick={() => handleImageClick(image.id, image.isOddOne)}
              className={`w-48 h-48 bg-white rounded-lg p-4 flex items-center justify-center cursor-pointer
                ${selectedImage === image.id && image.isOddOne ? 'bg-green-100' : ''}
                ${selectedImage === image.id && !image.isOddOne ? 'bg-red-100' : ''}
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
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <GameModal success={success} onRestart={handleRestart} />
        </div>
      )}
    </GameSectionLayout>
  );
}