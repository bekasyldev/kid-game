import BackButton from "../components/BackButton";
import PageLayout from "../components/PageLayout";
import Image from 'next/image';
export default function NeurogymnasticsPage() {
    const images = [
        { src: "/assets/neurogymnastics/1.jpg", alt: "Нейрогимнастика 1" },
        { src: "/assets/neurogymnastics/2.jpg", alt: "Нейрогимнастика 2" },
        { src: "/assets/neurogymnastics/3.jpg", alt: "Нейрогимнастика 3" },
        { src: "/assets/neurogymnastics/4.jpg", alt: "Нейрогимнастика 4" },
    ];

  return (
    <PageLayout>
      <section className="h-[100vh] flex flex-col justify-center items-center">
        <div className="bg-black/65 p-10 relative rounded-2xl flex items-center gap-8 w-fit">
          <div className="flex items-center gap-8">
            <BackButton />
            <h1 className="text-6xl text-center text-white">Нейрогимнастика</h1>
          </div>
        </div>
        <div className="mt-10 flex gap-4 justify-center">
            {images.map((image) => (
                <Image width={300} height={800} className="w-72 rounded-lg shadow-md" src={image.src} alt={image.alt} key={image.src} />
            ))}
        </div>
      </section>
    </PageLayout>
  );
}
