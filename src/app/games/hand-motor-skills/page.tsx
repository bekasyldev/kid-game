import GameSectionLayout from "@/app/components/GameSectionLayout";
import Image from 'next/image';
interface DrawingItem {
  title: string;
  fileName: string;
  image: string;
}

export default function HandMotorSkillsPage() {
  const drawings: DrawingItem[] = [
    { title: "Поезд", fileName: "draw_1", image: "/assets/hand_motor/draw_1.jpg" },
    { title: "Жануарлар", fileName: "draw_2", image: "/assets/hand_motor/draw_2.jpg" },
    { title: "Құс", fileName: "draw_3", image: "/assets/hand_motor/draw_3.jpg" },
    { title: "Тышқан", fileName: "draw_4", image: "/assets/hand_motor/draw_4.jpg" },
    { title: "Дельфин", fileName: "draw_5", image: "/assets/hand_motor/draw_5.jpg" },
    { title: "Сарай", fileName: "draw_6", image: "/assets/hand_motor/draw_6.jpg" },
    { title: "Мысық", fileName: "draw_7", image: "/assets/hand_motor/draw_7.jpg" },
    { title: "Түк", fileName: "draw_8", image: "/assets/hand_motor/draw_8.jpg" },
  ];

  return (
    <GameSectionLayout 
      title="Ұсақ қол моторикасы" 
      backgroundImage="/assets/bg/hand-motor.jpg"
    >
      <ul className="grid grid-cols-2 gap-10">
        {drawings.map((item) => (
          <li key={item.fileName} className="bg-white p-5 rounded-3xl shadow-lg">
            <a 
              href={`/files/hand_motor/${item.fileName}.pdf`} 
              download={`${item.fileName}.pdf`}
              className="flex flex-col items-center gap-2"
            >
              <Image width={145} height={192} src={item.image} alt={item.title} className="h-48" />
              <p className="font-bold text-2xl">{item.title}</p>
              <p className="font-semibold text-xl underline text-blue-500">
                жүктеп алу
              </p>
            </a>
          </li>
        ))}
      </ul>
    </GameSectionLayout>
  );
}
