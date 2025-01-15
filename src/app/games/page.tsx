'use client'
import { useRouter } from "next/navigation";
import PageLayout from "../components/PageLayout";
import BackButton from "../components/BackButton";

export default function GamesPage() {
  const router = useRouter();
  const games = [
    { title: "Есте сақтау", link: "/games/memory", },
    { title: "Ойлау", link: "/games/thinking" },
    { title: "Ұсақ қол моторикасы", link: "/games/hand-motor-skills" },
    { title: "Қиял", link: "/games/fantasy" },
    { title: "Зейін", link: "/games/attention" },
  ];

  return (
    <PageLayout>
      <section className="h-full flex flex-col justify-center gap-32">
        <section className="flex items-center gap-8">
          <BackButton />
          <h1 className="text-[var(--primary)] text-6xl font-bold text-center">
            Дидактикалык ойындар
          </h1>
        </section>
        <ul className="flex gap-4">
          {games.map((game) => (
            <li key={game.title} onClick={() => router.push(game.link)} className="flex-1 flex items-center justify-center text-center cursor-pointer p-8 rounded-2xl bg-[var(--primary)]">
              <p className="text-2xl text-white font-bold">{game.title}</p>
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  );
}
