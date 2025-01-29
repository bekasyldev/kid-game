import PageLayout from "../components/PageLayout";
import BackButton from "../components/BackButton";

export default function AuthorsPage() {
  const authors = [
    {
      name: "Алшынбекова Гульназия Канагатовна",
      description: "биология ғылымдарының кандидаты, қауымдастырылған профессор, Е.А. Бөкетов атындағы Қарағанды университеті"
    },
    {
      name: "Берікова Ақбота Берікқызы",
      description: "Магистрант педагогика факультеті Е.А. Бөкетов атындағы Қарағанды университеті"
    }
  ];

  return (
    <PageLayout>
      <section className="h-[100vh] flex flex-col justify-center">
        <section className="bg-white/75 p-10 relative rounded-2xl text-black">
          <section>
            <BackButton />
            <h1 className="text-6xl text-center">Авторлар</h1>
          </section>
          <section className="mt-4 text-center">
            <ul className="flex flex-col gap-8">
              {authors.map((author) => (
                <li key={author.name}>
                  <h2 className="text-3xl font-bold">{author.name}</h2>
                  <p className="text-xl">{author.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </section>
    </PageLayout>
  );
}
