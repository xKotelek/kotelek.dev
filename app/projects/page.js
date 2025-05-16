"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Projects() {
  const [showTitle, setShowTitle] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  const [showPr1, setShowPr1] = useState(false);
  const [showPr2, setShowPr2] = useState(false);
  const [showPr3, setShowPr3] = useState(false);
  const [showPr4, setShowPr4] = useState(false);

  const [showBtn, setShowBtn] = useState(false);

  const cardsRef = useRef([]);
  const gridRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setShowTitle(true), 100);
    setTimeout(() => setShowDesc(true), 300);

    setTimeout(() => setShowPr1(true), 500);
    setTimeout(() => setShowPr2(true), 500);
    setTimeout(() => setShowPr3(true), 700);
    setTimeout(() => setShowPr4(true), 700);

    setTimeout(() => setShowBtn(true), 900);
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleMouseMove = (e) => {
      const rect = grid.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPos = (x / rect.width - 0.5) * 2;
      const yPos = (y / rect.height - 0.5) * 2;

      const distance = Math.sqrt(xPos ** 2 + yPos ** 2); 
      const scale = 1.05 - Math.min(distance, 1.5) * 0.05;

      cardsRef.current.forEach((card) => {
        if (!card) return;
        card.style.transform = `
          perspective(1000px)
          rotateX(${yPos * -10}deg)
          rotateY(${xPos * 10}deg)
          scale(${scale})
        `;
      });
    };

    const handleMouseLeave = () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          card.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
          `;
        }
      });
    };

    grid.addEventListener("mousemove", handleMouseMove);
    grid.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      grid.removeEventListener("mousemove", handleMouseMove);
      grid.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const projects = [
    {
      title: "quickshop",
      description: "is a free item-shop maker.",
      href: "https://quickshop.kotelek.dev",
      image: "/projects/quickshop.png",
      icons: ["/icons/nextjs.svg", "/icons/tailwind.svg"],
    },
    {
      title: "quickpay",
      description: "is a free server-shop maker and payment gate.",
      href: "https://quickpay.kotelek.dev",
      image: "/projects/quickpay.png",
      icons: ["/icons/php.svg", "/icons/html.svg", "/icons/css.svg"],
    },
    {
      title: "ToDo!",
      description: "is an open-source task list.",
      href: "https://todo.kotelek.dev",
      image: "/projects/todo.png",
      icons: ["/icons/php.svg", "/icons/js2.svg", "/icons/html.svg", "/icons/css.svg"],
    },
    {
      title: "mbio",
      description: "is a free bio page maker.",
      href: "https://mbio.kotelek.dev",
      image: "/projects/mbio.png",
      icons: ["/icons/php.svg", "/icons/js2.svg", "/icons/html.svg", "/icons/css.svg"],
    },
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
      <div className="text-center flex flex-col items-center justify-center gap-6 w-full">
        <h1 className={`duration-800 text-4xl font-black text-purple-500 ${showTitle ? "opacity-100 translate-y-0 blur-none" : "opacity-0 -translate-y-12 blur-[8px]"}`}>
          xKotelek
        </h1>
        <h2 className={`duration-800 text-2xl font-bold ${showDesc ? "opacity-100 translate-y-0 blur-none" : "opacity-0 -translate-y-12 blur-[8px]"}`}>
          My Projects
        </h2>

        <div
          id="projects-grid"
          ref={gridRef}
          className="grid grid-rows-auto md:grid-rows-2 grid-cols-1 md:grid-cols-2 max-h-90 overflow-y-auto overflow-x-hidden p-5 gap-3"
        >
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`project z-[1] flex flex-col gap-1 bg-[#15151550] hover:shadow-xl border border-[#222] p-5 rounded-2xl w-full h-full
                transition-all duration-700 ease-out will-change-transform backdrop-blur-[8px]
                ${i === 0 && (showPr1 ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[8px] -translate-y-12")}
                ${i === 1 && (showPr2 ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[8px] -translate-y-12")}
                ${i === 2 && (showPr3 ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[8px] -translate-y-12")}
                ${i === 3 && (showPr4 ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[8px] -translate-y-12")}
              `}
            >
              <div>
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <Image src={project.image} width={64} height={64} alt={project.title} />
                    <span className="font-black text-xl">{project.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.icons.map((icon, j) => (
                      <Image key={j} src={icon} width={32} height={32} alt="icon" />
                    ))}
                  </div>
                </div>
                <div className="text-left pl-2">
                  <b>{project.title}</b> {project.description}
                </div>
              </div>
              <Link href={project.href} target="_blank" className="mt-auto w-full px-4 py-2 bg-purple-700/50 hover:bg-purple-700/75 duration-300 border border-purple-700 font-bold rounded-xl">
                Check out!
              </Link>
            </div>
          ))}
        </div>

        <div className={`duration-800 ${showBtn ? "opacity-100 translate-y-0 blur-none" : "opacity-0 -translate-y-12 blur-[8px]"} flex justify-center items-center`}>
          <Link
            className="px-4 py-2 font-bold bg-purple-700/25 hover:scale-110 scale-100 hover:bg-purple-700/50 duration-300 border border-purple-700 rounded-2xl"
            href="/"
          >
            Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
