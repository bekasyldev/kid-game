import GameSectionLayout from "@/app/components/GameSectionLayout";
import Link from "next/link";
export default function FantasyGamesPage() {
  const games = [
    { title: "Жануарды оның әрпімен сәйкестендіріңіз", link: "/games/fantasy/1" },
    { title: "Түстерді дұрыс элементтерге сүйреу", link: "/games/fantasy/2" },
    { title: "Cөздерді дұрыс элементтерге сүйреу", link: "/games/fantasy/3" },
    // check it
    { title: "Бөліктерін тап", link: "/games/fantasy/4" },
    { title: "Кім не жейді", link: "/games/fantasy/5" },
    { title: "Ребус", link: "/games/fantasy/6" },
    { title: "Түстерді ретімен қой", link: "/games/fantasy/7" },
  ];

  return (
    <GameSectionLayout 
      title="Қиял ойындары" 
      backgroundImage="/assets/bg/fantasy.webp"
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
