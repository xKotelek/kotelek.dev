export default function FooterComponent() {
  return (
    <div
      className="reveal fixed bottom-0 flex justify-center items-center w-full font-bold"
      style={{ "--d": "100ms" }}
    >
      <span>
        Copyright &copy; 2026{" "}
        <a href="https://kotelek.dev" className="text-purple-700 hover:text-purple-500 duration-300">
          xKotelek
        </a>
      </span>
    </div>
  );
}
