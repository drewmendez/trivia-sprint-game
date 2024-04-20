import { useMemo, useState, useEffect } from "react";
import { useQuiz } from "../../store";
import { shuffleArray } from "../../utils/shuffleArray";
import { replaceEntities } from "../../utils/replaceEntities";
import StatusHeader from "./StatusHeader";

const NUM_OF_QUESTIONS = 10;

export default function Game() {
  const [itemIndex, setItemIndex] = useState(0);
  const [didAnswer, setDidAnswer] = useState(false);
  const quizItems = useQuiz((state) => state.quizItems);
  const type = useQuiz((state) => state.type);
  const question = replaceEntities(quizItems[itemIndex].question);
  const correctAns = replaceEntities(quizItems[itemIndex].correct_answer);
  const incorrectAns = quizItems[itemIndex].incorrect_answers.map((item) =>
    replaceEntities(item),
  );

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  let timer: number;

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

  const choices = useMemo(() => {
    return type === "multiple"
      ? shuffleArray([correctAns, ...incorrectAns])
      : ["True", "False"];
  }, [itemIndex]);

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

      setScore((prev) => prev + 200);
      if (timeLeft >= 11) {
        setTimeout(() => {
          setScore((prev) => prev + 120);
        }, 1000);
      } else if (timeLeft >= 6 && timeLeft <= 10) {
        setTimeout(() => {
          setScore((prev) => prev + 60);
        }, 1000);
      }
    } else {
      (event.target as Element).classList.remove("bg-slate-200");
      (event.target as Element).classList.add("bg-red-500");
      (event.target as Element).classList.add("border-red-500");

      revealAnswer();
    }
    setDidAnswer(true);
  };

  const handleNext = () => {
    if (itemIndex === NUM_OF_QUESTIONS - 1) return;

    setItemIndex(itemIndex + 1);
    setDidAnswer(false);
    setTimeLeft(15);

    const btns = document.querySelectorAll(".btn");
    btns.forEach((btn) => {
      btn.classList.remove("bg-green-500");
      btn.classList.remove("border-green-500");
      btn.classList.remove("bg-red-500");
      btn.classList.remove("border-red-500");
      btn.classList.add("bg-slate-200");
    });
  };

  return (
    <>
      <StatusHeader
        questionNumber={itemIndex + 1}
        timeLeft={timeLeft}
        score={score}
      />

      <div className="flex min-h-28 items-center justify-center">
        <p className="text-center text-xl font-medium">{question}</p>
      </div>

      <div className="mb-4 grid gap-4">
        {choices.map((choice, index) => (
          <button
            className="btn rounded-md border-2 bg-slate-200 px-4 py-2 shadow-md transition-colors"
            key={index}
            onClick={(event) => handleAnswer(event, choice)}
            disabled={didAnswer}
          >
            {choice}
          </button>
        ))}
      </div>

      <p dangerouslySetInnerHTML={{ __html: "&lrm;" }} />

      {didAnswer ? (
        <button className="bg-green-500 px-4 py-2" onClick={handleNext}>
          next
        </button>
      ) : null}
    </>
  );
}
