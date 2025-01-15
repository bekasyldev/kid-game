import BackButton from "./BackButton";

interface GameSectionLayoutProps {
  children: React.ReactNode;
  title: string;
  backgroundImage: string;
  darkHeader?: boolean;
}

export default function GameSectionLayout({ 
  children, 
  title, 
  backgroundImage,
  darkHeader = false 
}: GameSectionLayoutProps) {
  return (
    <section 
      className="h-min-screen overflow-y-auto w-[100vw] bg-no-repeat bg-cover text-black flex flex-col justify-center items-center" 
      style={{ backgroundImage: `url('${backgroundImage}')`, minHeight: '100vh' }}
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