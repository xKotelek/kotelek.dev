export default function HoverMeSVG() {
  return (
    <svg viewBox="0 0 300 300" className="absolute w-full h-full duration-800 animate-spin-slow group-hover:animate-paused scale-100 group-hover:scale-0 md:block hidden">
      <defs>
        <path
          id="circlePath"
          d="M 150, 150
             m -120, 0
             a 120,120 0 1,1 240,0
             a 120,120 0 1,1 -240,0"
        />
      </defs>
      <text fill="#a855f7" fontSize="13.9" fontWeight="bold">
        <textPath href="#circlePath" startOffset="0%">
            HOVER ME •
            HOVER ME •
            HOVER ME •
            HOVER ME •
            HOVER ME •
            HOVER ME •
            HOVER ME •
            HOVER ME •
            HOVER ME •
        </textPath>
      </text>
    </svg>
  );
}
