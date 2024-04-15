import { useQuiz } from "../store/gameStore";

export default function Quiz() {
  const quizItems = useQuiz((state) => state.quizItems);

  console.log(quizItems);

  return <div>Quiz</div>;
}
