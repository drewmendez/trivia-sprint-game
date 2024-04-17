import { useState } from "react";
import QuizPreStart from "./QuizPreStart";
import Game from "./Game";

export default function Quiz() {
  const [isPlay, setIsPlay] = useState(false);

  return (
    <main className="mx-auto min-h-dvh max-w-[500px] px-4 pt-28">
      {isPlay ? <Game /> : <QuizPreStart setIsPlay={setIsPlay} />}
    </main>
  );
}
