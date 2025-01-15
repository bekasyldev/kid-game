import Image from "next/image";

interface GameModalProps {
  success: boolean;
  onRestart: () => void;
}

export default function GameModal({ success, onRestart }: GameModalProps) {
  return success ? (
    <div className="bg-black/75 p-10 relative rounded-2xl">
      <div className="absolute -top-20 w-full flex justify-center -left-[5px]">
        <Image src="/assets/cow.gif" className="w-[120px]" alt="success animation" width={120} height={120} unoptimized />
      </div>
      <h1 className="text-white text-6xl font-bold text-center">Құттықтаймыз!</h1>
      <p className="text-3xl text-white text-center mt-6">
        Сіз дұрыс суретті таптыңыз
      </p>
      <button 
        onClick={onRestart}
        className="text-white w-full bg-blue-500 py-2 mt-6 rounded-lg"
      >
        Басынан бастау
      </button>
    </div>
  ) : (
    <div className="bg-black/75 p-10 relative rounded-2xl">
      <h1 className="text-white text-6xl font-bold text-center">Дұрыс емес!</h1>
      <p className="text-3xl text-white text-center mt-6">
        Қайтадан ойнап көріңіз!
      </p>
      <button 
        onClick={onRestart}
        className="text-white w-full bg-blue-500 py-2 mt-6 rounded-lg"
      >
        Қайтадан көру
      </button>
    </div>
  );
} 