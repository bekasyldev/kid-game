'use client'

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const links = [
    {
      title: "Ойындар",
      href: "/games",
    },
    {
      title: "Нейрогимнастика",
      href: "/neurogymnastics",
    },
    {
      title: "Оқу құралы туралы",
      href: "/about",
    },
    {
      title: "Ата-аналарға арналған",
      href: "/parents",
    },
    {
      title: "Авторлар",
      href: "/authors",
    },
  ];
  return (
    <div>
      <section className="h-[100vh] overflow-hidden overflow-y-auto w-[100vw] bg-no-repeat bg-cover"  style={{ backgroundImage: "url('kids.png')" }}>
        <section className="max-w-[1200px] mx-auto h-full">
          <section className="h-full flex flex-col justify-center gap-40">
            <h1 className="text-[#7F9E3E] text-9xl font-bold text-center">
              Тапқыр балақан
            </h1>
            <ul className="flex gap-4">
              {links.map((link) => (
                <li key={link.title} className="bg-[--primary] flex-1 flex items-center justify-center text-center cursor-pointer p-8 rounded-2xl ">
                  <p onClick={() => router.push(link.href)} className="text-2xl text-white p-4 rounded-2xl font-bold">{link.title}</p>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </section>
    </div>
  );
}
