import Image from "next/image";

// Separate rotation from the reveal so labels remain upright throughout orbit.
export default function FloatingSkill({ label, icon, angle, delay }) {
  return (
    <li
      className="skill-orbit"
      style={{
        "--angle": `${angle}deg`,
        "--d": `${delay}ms`,
      }}
    >
      <div className="skill-position">
        <div className="skill-counter-spin">
          <div className="skill-chip">
            <Image src={icon} width={16} height={16} alt="" />
            <span>{label}</span>
          </div>
        </div>
      </div>
    </li>
  );
}
