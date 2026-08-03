import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-dvh flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
      <div className="text-center flex flex-col items-center justify-center gap-6">
        <h1 className="reveal text-4xl font-black text-purple-500">xKotelek</h1>
        <h2 className="reveal text-2xl font-bold" style={{ "--d": "120ms" }}>
          Page not found!
        </h2>
        <div className="reveal" style={{ "--d": "240ms" }}>
          <Link
            className="px-4 py-2 font-bold bg-purple-700/25 hover:scale-110 hover:bg-purple-700/50 duration-300 border border-purple-700 rounded-2xl"
            href="/"
          >
            Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
