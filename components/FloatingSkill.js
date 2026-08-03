import Image from "next/image";

// Position, rotation and stagger are handed to CSS as custom properties, so the
// open/close animation is driven entirely by the container's data-open state.
export default function FloatingSkill({ label, icon, x, y, r, delay }) {
  return (
    <div
      className="skill-chip flex items-center gap-1 text-sm font-semibold bg-purple-100 text-purple-700 px-3 py-1 rounded-full shadow-md whitespace-nowrap"
      style={{
        "--x": `${x}px`,
        "--y": `${y}px`,
        "--r": `${r}deg`,
        "--d": `${delay}ms`,
      }}
    >
      {icon && <Image src={icon} width={16} height={16} alt="" />}
      <span>{label}</span>
    </div>
  );
}
