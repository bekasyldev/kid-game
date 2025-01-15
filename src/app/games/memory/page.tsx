import GameSectionLayout from "@/app/components/GameSectionLayout";
import Link from "next/link";
export default function MemoryGamesPage() {
  const games = [
    { title: "Суреттердің тиісті орындарын табу", link: "/games/memory/1" },
    { title: "Тізбекті жалғастыр", link: "/games/memory/2" },
    { title: "Дұрыс қатарды тап", link: "/games/memory/3" },
    { title: "Бірдей суретті тап", link: "/games/memory/4" },
    { title: "Әріптерді сәйкестендір", link: "/games/memory/5" },
    { title: "Қатарды жаттап ал", link: "/games/memory/6" },
    { title: "Сөздерді орналастыр", link: "/games/memory/7" },
  ];

  return (
    <GameSectionLayout 
      title="Есте сақтау" 
      backgroundImage="/assets/bg/memory.jpg"
      darkHeader
    >
      <ul className="flex flex-wrap gap-4">
        {games.map((game) => (
          <li 
            key={game.title} 
            className="flex-1 flex items-center justify-center text-center cursor-pointer p-8 rounded-2xl bg-[var(--secondary)]"
          >
            <Link href={game.link}>
              <p className="text-4xl text-white font-bold">{game.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </GameSectionLayout>
  );
}
