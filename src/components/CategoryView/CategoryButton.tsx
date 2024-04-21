import { useGame, useQuiz } from "../../store";

type Prop = {
  difficulty: string;
  type: string;
};

export default function CategoryButton({ difficulty, type }: Prop) {
  const startGame = useGame((state) => state.startGame);
  const fetchQuizItems = useQuiz((state) => state.fetchQuizItems);

  const handleClick = () => {
    startGame();
    fetchQuizItems(difficulty, type);
  };

  return (
    <button
      className="rounded bg-white px-8 py-2 text-xl font-medium capitalize duration-150 hover:opacity-80"
      onClick={handleClick}
    >
      {difficulty}
    </button>
  );
}
