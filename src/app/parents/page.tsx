import PageLayout from "../components/PageLayout";
import BackButton from "../components/BackButton";

export default function ParentsPage() {
  const parentAdvices = [
    "Ойынды баланың жасына сай таңдаңыз. Әр баланың даму ерекшеліктерін ескере отырып, ойынның деңгейін таңдаңыз. Мысалы, жас балалар үшін қарапайым ойыншықтар немесе карточкалармен ойындар, ал үлкен балаларға логикалық ойындар мен тапсырмалар қызықты болуы мүмкін.",
    "Баланың қызығушылығын бақылаңыз. Баланың қандай ойындарға қызығатынын бақылап, сол ойындарды таңдаңыз. Бұл ойынның бала үшін тиімді әрі қызықты болуын қамтамасыз етеді.",
    "Ойынды бірге ойнаңыз. Балаға көңіл бөліп, бірге ойнау оның дамуына үлкен әсер етеді. Ойынды бала өзі бастаған жағдайда да, онымен бірге қатысудың маңызы зор.",
    "Қателіктерге түсіністікпен қараңыз. Егер бала ойын барысында қателессе, оған сабырлықпен түсіндіріңіз. Бұл оның өзін-өзі бағалауының өсуіне көмектеседі."
  ];

  return (
    <PageLayout>
      <section className="flex flex-col justify-center max-w-[1200px] mx-auto my-10 bg-white/75 p-10 relative rounded-2xl">
        <section>
          <BackButton />
          <h1 className="text-6xl text-center text-black">Құрметті ата-ана!</h1>
        </section>

        <section className="mt-6 text-justify text-2xl text-black">
          <p>
            <b>Дидактикалық ойындар</b> - балалардың зияткерлік дамуы мен эмоционалдық қалыптасуына өте пайдалы. 
            Бұл ойындар тек көңіл көтерумен ғана шектелмейді, олар баланың танымдық қабілеттерін дамытуға, 
            жеке қасиеттерін қалыптастыруға, сондай-ақ ата-анамен қарым-қатынасты нығайтуға ықпал етеді.
          </p>

          <div className="space-y-6 mt-6">
            <h2 className="font-bold text-2xl">1. Баланың зияткерлік дамуы</h2>
            <p>
              Дидактикалық ойындар баланың логикалық ойлауын, есте сақтау қабілетін, назарын дамытуға көмектеседі.
            </p>
            <ul className="list-disc pl-6">
              <li>Санамақтар, сөзжұмбақтар, логикалық тапсырмалар арқылы бала ойлау дағдыларын дамыта алады.</li>
              <li>Ребустар мен жұмбақтар сөздік қорды арттырып, тілдік қабілеттерін нығайтады.</li>
            </ul>

            <h2 className="font-bold text-2xl">2. Баланың креативтілігін арттыру</h2>
            <p>
              Ойындар баланың шығармашылық ойлауын ынталандырады. Мысалы, бала түрлі фигуралардан немесе 
              материалдардан жаңа дүниелер жасап, өзінше шешімдер табады. Бұл оның қиялын, шығармашылық қабілеттерін дамытады.
            </p>

            <h2 className="font-bold text-2xl">Ата-аналарға кеңестер:</h2>
            <ul className="list-disc pl-6 space-y-4">
              {parentAdvices.map((advice, index) => (
                <li key={index}>{advice}</li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </PageLayout>
  );
}
