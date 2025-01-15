'use client'

import { useRouter } from 'next/navigation';
import GameSectionLayout from "@/app/components/GameSectionLayout";


export default function ThinkingGamesPage() {
  const router = useRouter();
  const games = [
    { title: "Жануарды көлеңкесіне қарай табу", link: "/games/thinking/1" },
    { title: "Жоғалған әріптерді табу", link: "/games/thinking/2" },
    { title: "Сандармен сәйкестендір", link: "/games/thinking/3" },
    // check 3
    { title: "Кім қайда мекендейді", link: "/games/thinking/4" },
    { title: "Ойлан тап", link: "/games/thinking/5" },
    { title: "Себетті толтыр", link: "/games/thinking/6" },
    { title: "үлкен кіші", link: "/games/thinking/7" },
  ];

  return (
    <GameSectionLayout 
      title="Ойлау ойындары" 
      backgroundImage="/assets/bg/thinking.webp"
      darkHeader
    >
      <ul className="flex flex-wrap gap-4">
        {games.map((game) => (
          <li 
            key={game.title} 
            className="flex-1 flex items-center justify-center text-center cursor-pointer p-8 rounded-2xl bg-[var(--secondary)]"
            onClick={() => router.push(game.link)}>
            <p className="text-4xl text-white font-bold">{game.title}</p>
          </li>
        ))}
      </ul>
    </GameSectionLayout>
  );
}
