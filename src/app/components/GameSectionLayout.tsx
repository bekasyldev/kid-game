import BackButton from "./BackButton";

interface GameSectionLayoutProps {
  children: React.ReactNode;
  title: string;
  backgroundImage: string;
  darkHeader?: boolean;
}

const warmBackgroundColors = [
  "#FF5733", // Bright Orange
  "#FF8C42", // Pumpkin Orange
  "#FFC300", // Sunny Yellow
  "#FF6F61", // Coral
  "#FF9A8B", // Peach Pink
  "#FFCCCB", // Light Pink
  "#FFB74D", // Soft Orange
  "#FFEB3B", // Lemon Yellow
  "#FF7043", // Vibrant Salmon
  "#FFD54F", // Golden Yellow
  "#FF5252", // Bright Red
  "#FFAB91", // Soft Peach
  "#FF5722", // Tangerine
  "#F57C00", // Deep Orange
  "#FF9800"  // Warm Amber
];

export default function GameSectionLayout({ 
  children, 
  title, 
  backgroundImage,
  darkHeader = false 
}: GameSectionLayoutProps) {
  return (
    <section 
      className="min-h-screen overflow-y-auto w-[100vw] text-black flex flex-col justify-center items-center" 
      style={{ backgroundColor: warmBackgroundColors[Math.floor(Math.random() * warmBackgroundColors.length)] }}
    >
      <section className="max-w-[1200px] mx-auto h-full">
        <section className="h-full flex flex-col justify-center gap-32">
          <section className={`${darkHeader ? 'bg-black/65' : ''} p-10 relative rounded-2xl flex items-center gap-8`}>
            <BackButton />
            <h1 className={`${darkHeader ? 'text-white' : ''} text-6xl font-bold text-center`}>
              {title}
            </h1>
          </section>
          {children}
        </section>
      </section>
    </section>
  );
}