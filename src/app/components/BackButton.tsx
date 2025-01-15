/* eslint-disable @next/next/no-img-element */

"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    }

  return (
    <button className="bg-[var(--primary)] p-4 rounded-full" onClick={handleBack}>
      <img className="w-10" src="data:image/svg+xml,%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Transformed%20by:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23ffffff'%20width='800px'%20height='800px'%20viewBox='0%200%2032%2032'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20stroke='%23ffffff'%3e%3cg%20id='SVGRepo_bgCarrier'%20stroke-width='0'/%3e%3cg%20id='SVGRepo_tracerCarrier'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cg%20id='SVGRepo_iconCarrier'%3e%3ctitle%3ereturn%3c/title%3e%3cpath%20d='M0%2021.984q0.032-0.8%200.608-1.376l4-4q0.448-0.48%201.056-0.576t1.12%200.128%200.864%200.736%200.352%201.12v1.984h18.016q0.8%200%201.408-0.576t0.576-1.408v-8q0-0.832-0.576-1.408t-1.408-0.608h-16q-0.736%200-1.248-0.416t-0.64-0.992%200-1.152%200.64-1.024%201.248-0.416h16q2.464%200%204.224%201.76t1.76%204.256v8q0%202.496-1.76%204.224t-4.224%201.76h-18.016v2.016q0%200.64-0.352%201.152t-0.896%200.704-1.12%200.096-1.024-0.544l-4-4q-0.64-0.608-0.608-1.44z'/%3e%3c/g%3e%3c/svg%3e" alt="back icon" />
    </button>
  );
} 