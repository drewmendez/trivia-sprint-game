import { useMemo, useState } from "react";
import { useQuiz } from "../../store";
import { shuffleArray } from "../../utils/shuffleArray";

export default function Game() {
  const [itemIndex, setItemIndex] = useState(0);
  const [didAnswer, setDidAnswer] = useState(false);
  const quizItems = useQuiz((state) => state.quizItems);
  const type = useQuiz((state) => state.type);
  const correctAns = quizItems[itemIndex].correct_answer;
  const incorrectAns = quizItems[itemIndex].incorrect_answers;

  const choices = useMemo(() => {
    return type === "multiple"
      ? shuffleArray([correctAns, ...incorrectAns])
      : ["True", "False"];
  }, [itemIndex]);

  // const choices =
  //   type === "multiple" ? memoizedShuffleArray : ["True", "False"];

  const handleAnswer = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    choice: string,
  ) => {
    if (choice === correctAns) {
      (event.target as Element).classList.add("bg-green-500");
    } else {
      (event.target as Element).classList.add("bg-red-500");

      const aTags = document.querySelectorAll(".btn");
      const searchText = correctAns;
      let found;

      for (var i = 0; i < aTags.length; i++) {
        if (aTags[i].textContent == searchText) {
          found = aTags[i];
          break;
        }
      }

      console.log(typeof found);
      found?.classList.add("bg-green-500");
    }
    setDidAnswer(true);
  };

  const handleNext = () => {
    setItemIndex(itemIndex + 1);
    setDidAnswer(false);
    const btns = document.querySelectorAll(".btn");

    btns.forEach((btn) => {
      btn.classList.remove("bg-green-500");
      btn.classList.remove("bg-red-500");
    });
  };

  return (
    <div>
      <div className="flex min-h-28 items-center justify-center">
        <p
          className="text-center text-xl font-medium"
          dangerouslySetInnerHTML={{ __html: quizItems[itemIndex].question }}
        />
      </div>

      <div className="mb-4 grid gap-2">
        {choices.map((choice, index) => (
          <button
            className="btn rounded-md border border-slate-500 px-4 py-2 transition-colors"
            key={index}
            dangerouslySetInnerHTML={{ __html: choice }}
            onClick={(event) => handleAnswer(event, choice)}
          />
        ))}
      </div>

      {didAnswer ? (
        <button className="bg-green-500 px-4 py-2" onClick={handleNext}>
          next
        </button>
      ) : null}
    </div>
  );
}
