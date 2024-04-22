import { useMemo, useState, useEffect } from "react";
import { useGame, useQuiz } from "../../store";
import { shuffleArray } from "../../utils/shuffleArray";
import { replaceEntities } from "../../utils/replaceEntities";
import StatusHeader from "./StatusHeader";

const NUM_OF_QUESTIONS = 10;

export default function Game() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsGotRight, setQuestionsGotRight] = useState(0);

  return (
    <>
      {isGameOver ? (
        <Result score={score} questionsGotRight={questionsGotRight} />
      ) : (
        <QuizGame
          setIsGameOver={setIsGameOver}
          score={score}
          setScore={setScore}
          setQuestionsGotRight={setQuestionsGotRight}
        />
      )}
    </>
  );
}

interface QuizGameProps {
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setQuestionsGotRight: React.Dispatch<React.SetStateAction<number>>;
}

function QuizGame({
  setIsGameOver,
  score,
  setScore,
  setQuestionsGotRight,
}: QuizGameProps) {
  const [itemIndex, setItemIndex] = useState(0);
  const [didAnswer, setDidAnswer] = useState(false);
  const [speedBonus, setSpeedBonus] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  let timer: number;
  const quizItems = useQuiz((state) => state.quizItems);
  const type = useQuiz((state) => state.type);
  const question = replaceEntities(quizItems[itemIndex].question);
  const correctAns = replaceEntities(quizItems[itemIndex].correct_answer);
  const incorrectAns = quizItems[itemIndex].incorrect_answers.map((item) =>
    replaceEntities(item),
  );
  const choices = useMemo(() => {
    return type === "multiple"
      ? shuffleArray([correctAns, ...incorrectAns])
      : ["True", "False"];
  }, [itemIndex]);

  useEffect(() => {
    if (!didAnswer && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }

    if (didAnswer) {
      clearInterval(timer);
    }

    if (timeLeft === 0) {
      setDidAnswer(true);
      revealAnswer();
    }

    return () => {
      clearInterval(timer);
    };
  });

  const revealAnswer = () => {
    const btns = document.querySelectorAll(".btn");
    const searchText = correctAns;
    let found;

    for (var i = 0; i < btns.length; i++) {
      if (btns[i].textContent == searchText) {
        found = btns[i];
        break;
      }
    }

    found?.classList.remove("bg-slate-200");
    found?.classList.add("border-green-500");
  };

  const handleAnswer = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    choice: string,
  ) => {
    if (choice === correctAns) {
      (event.target as Element).classList.remove("bg-slate-200");
      (event.target as Element).classList.add("bg-green-500");
      (event.target as Element).classList.add("border-green-500");
      (event.target as Element).classList.add("text-white");

      setScore((prev) => prev + 200);
      setQuestionsGotRight((prev) => prev + 1);

      if (timeLeft >= 11) {
        setTimeout(() => {
          setSpeedBonus(120);
        }, 500);
        setTimeout(() => {
          setScore((prev) => prev + 120);
        }, 1300);
      } else if (timeLeft >= 6 && timeLeft <= 10) {
        setTimeout(() => {
          setSpeedBonus(60);
        }, 500);
        setTimeout(() => {
          setScore((prev) => prev + 60);
        }, 1300);
      }
      setTimeout(() => {
        setSpeedBonus(0);
      }, 1500);
    } else {
      (event.target as Element).classList.remove("bg-slate-200");
      (event.target as Element).classList.add("bg-red-500");
      (event.target as Element).classList.add("border-red-500");
      (event.target as Element).classList.add("text-white");

      revealAnswer();
    }
    setDidAnswer(true);
  };

  const handleNext = () => {
    if (itemIndex === NUM_OF_QUESTIONS - 1) {
      setIsGameOver(true);
      return;
    }

    setItemIndex(itemIndex + 1);
    setDidAnswer(false);
    setTimeLeft(15);

    const btns = document.querySelectorAll(".btn");
    btns.forEach((btn) => {
      btn.classList.remove("bg-green-500");
      btn.classList.remove("border-green-500");
      btn.classList.remove("bg-red-500");
      btn.classList.remove("border-red-500");
      btn.classList.remove("text-white");
      btn.classList.add("bg-slate-200");
    });
  };

  return (
    <>
      <StatusHeader
        questionNumber={itemIndex + 1}
        timeLeft={timeLeft}
        score={score}
        speedBonus={speedBonus}
      />
      <div className="flex min-h-48 items-center justify-center">
        <p className="text-center text-2xl font-medium">{question}</p>
      </div>
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        {choices.map((choice, index) => (
          <button
            className="btn rounded-md border-2 bg-slate-200 px-4 py-2 font-semibold shadow-md transition-colors"
            key={index}
            onClick={(event) => handleAnswer(event, choice)}
            disabled={didAnswer}
          >
            {choice}
          </button>
        ))}
      </div>
      <button
        className={`absolute ${didAnswer ? "right-1/2 translate-x-1/2" : "-right-1/2"} rounded bg-green-500 px-10 py-2 text-xl font-medium text-white duration-500`}
        onClick={handleNext}
      >
        {itemIndex === NUM_OF_QUESTIONS - 1 ? "Result >" : "Next >"}
      </button>
    </>
  );
}

function Result({
  score,
  questionsGotRight,
}: {
  score: number;
  questionsGotRight: number;
}) {
  const endGame = useGame((state) => state.endGame);
  const endPlay = useGame((state) => state.endPlay);
  const type = useQuiz((state) => state.type);
  const difficulty = useQuiz((state) => state.difficulty);
  const fetchQuizItems = useQuiz((state) => state.fetchQuizItems);

  const resetQuiz = () => {
    useQuiz.getState().quizItems = [];
    useQuiz.getState().type = "";
    useQuiz.getState().difficulty = "";
  };

  const tryAgain = () => {
    fetchQuizItems(difficulty, type);
    resetQuiz();
    endPlay();
  };

  const exitGame = () => {
    resetQuiz();
    endGame();
    endPlay();
  };

  return (
    <div className="mx-auto max-w-[500px]">
      <div className="flex flex-col rounded-xl bg-slate-800 p-4 text-white">
        <div className="-mb-[1px] grid place-items-center rounded-tl-lg rounded-tr-lg border border-white p-4">
          <p>SCORE</p>
          <p className="text-7xl font-bold">{score}!</p>
        </div>
        <div className="grid place-items-center rounded-bl-lg rounded-br-lg border border-white p-4">
          <p>QUESTIONS YOU GOT RIGHT</p>
          <p className="mt-1 flex text-4xl font-semibold">
            {questionsGotRight}{" "}
            <span className="mx-4 my-auto text-xl font-normal">of</span> 10
          </p>
        </div>
      </div>
      <div className="mt-9 grid gap-4">
        <button
          className="text-start font-bold uppercase text-slate-800"
          onClick={tryAgain}
        >
          {`TRY AGAIN ${difficulty} ${type === "multiple" ? "multiple choice" : "true or false"} >`}
        </button>
        <button
          className="text-start font-bold text-slate-800"
          onClick={exitGame}
        >
          EXIT QUIZ &gt;
        </button>
      </div>
    </div>
  );
}
