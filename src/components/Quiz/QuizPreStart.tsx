import { useQuiz } from "../../store";
import ClipLoader from "react-spinners/ClipLoader";

interface QuizPreStartProp {
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function QuizPreStart({ setIsPlay }: QuizPreStartProp) {
  const type = useQuiz((state) => state.type);
  const difficulty = useQuiz((state) => state.difficulty);

  return (
    <>
      {type === "" ? (
        <Loading />
      ) : (
        <Content type={type} difficulty={difficulty} setIsPlay={setIsPlay} />
      )}
    </>
  );
}

function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-300 bg-opacity-70">
      <div className="absolute top-40 px-4 text-center">
        <p className="text-2xl font-semibold">
          Fetching quiz items from{" "}
          <a
            className="text-blue-500 underline"
            href="https://opentdb.com/"
            target="_blank"
          >
            opentb.com
          </a>
          ...
        </p>
        <p className="pt-4 text-lg leading-6">
          If the loading persists, there might be a temporary issue with the
          data source. Please try again later.
        </p>
      </div>
      <ClipLoader size={80} />
    </div>
  );
}

interface ContentProp {
  type: string;
  difficulty: string;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

function Content({ type, difficulty, setIsPlay }: ContentProp) {
  return (
    <>
      <h2 className="mb-4 mt-4 text-center text-2xl font-bold">
        {type === "multiple" ? "Multiple Choice" : "True or False"}
      </h2>
      <p className="text-xl font-semibold capitalize">
        Difficulty: {difficulty}
      </p>
      <p className="mb-7 mt-2">
        You'll have 15 seconds to answer each question. The faster you answer,
        the higher your score. <span className="font-bold">GOODLUCK!</span>
      </p>
      <div className="flex justify-center">
        <button
          className="text-bold w-1/4 rounded-md bg-slate-800 px-4 py-2 font-bold text-white duration-150 hover:scale-110 active:scale-90"
          onClick={() => setIsPlay(true)}
        >
          Start
        </button>
      </div>
    </>
  );
}
