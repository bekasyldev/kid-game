import GameSectionLayout from "@/app/components/GameSectionLayout";
import Link from "next/link";
export default function FantasyGamesPage() {
  const games = [
    { title: "4-ші артық", link: "/games/attention/1" },
    { title: "10 айырмашылықты тап", link: "/games/attention/2" },
    { title: "Келесі не", link: "/games/attention/3" },
    { title: "Суретті ізде", link: "/games/attention/4" },
    { title: "Сынарын тап", link: "/games/attention/5" },
    { title: "Сынарын тауып көр", link: "/games/attention/6" },
    { title: "Тізбекті жалғастыр", link: "/games/attention/7" },
  ];

  return (
    <GameSectionLayout 
      title="Зейін ойындары" 
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