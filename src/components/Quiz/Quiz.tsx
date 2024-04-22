import { useGame } from "../../store";
import QuizPreStart from "./QuizPreStart";
import Game from "./Game";

export default function Quiz() {
  const isPlay = useGame((state) => state.isPlay);

  return (
    <main className="relative mx-auto min-h-dvh max-w-[816px] overflow-hidden px-4 pt-28">
      {isPlay ? <Game /> : <QuizPreStart />}
    </main>
  );
}
