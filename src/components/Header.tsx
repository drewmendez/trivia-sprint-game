export default function Header() {
  return (
    <header className="fixed w-full py-4 text-center shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,0.15)]">
      <h1 className="mb-2 text-4xl font-bold">Quiz Game</h1>
      <p className="text-sm tracking-widest">
        &copy; Andrew Mendez {new Date().getFullYear()}
      </p>
    </header>
  );
}
