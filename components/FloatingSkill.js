"use client";
import Image from "next/image";

export default function FloatingSkill({ label, icon: Icon, x, y, r, visible, index }) {
  return (
    <div
      className={`
        absolute left-1/2 top-1/2
        text-sm font-semibold bg-purple-100 text-purple-700 px-3 py-1 rounded-full shadow-md
        transition-all duration-600 ease-out
        ${visible ? "opacity-100 scale-100 blur-none" : "opacity-0 scale-50 blur-[8px]"}
      `}
      style={{
        transform: visible
          ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${r}deg)`
          : "translate(-50%, -50%) rotate(0deg)",
        transitionDelay: visible ? `${index * 100}ms` : '0ms'
      }}
    >
      <div className="flex items-center gap-1">
        {Icon && (
          <Image
            className="text-purple-700"
            src={Icon}
            width={16}
            height={16}
            alt={`${label} icon`}
          />
        )}
        <span>{label}</span>
      </div>
    </div>
  );
}
