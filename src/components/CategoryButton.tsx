import { useGame, useQuiz } from "../store/gameStore";

type Prop = {
  difficulty: string;
  type: string;
};

export default function CategoryButton({ difficulty, type }: Prop) {
  const setIsGameStarted = useGame((state) => state.setIsGameStarted);
  const fetchQuizItems = useQuiz((state) => state.fetchQuizItems);

  const handleClick = () => {
    setIsGameStarted();
    fetchQuizItems(difficulty, type);
  };

  return (
    <button
      className="bg-white px-8 py-1 text-xl font-medium capitalize"
      onClick={handleClick}
    >
      {difficulty}
    </button>
  );
}
