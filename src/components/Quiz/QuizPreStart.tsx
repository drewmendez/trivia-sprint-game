import { useQuiz } from "../../store";

export default function QuizPreStart({
  setIsPlay,
}: {
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
  return <p>Loading...</p>;
}

function Content({
  type,
  difficulty,
  setIsPlay,
}: {
  type: string;
  difficulty: string;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <h2 className="text-center text-2xl font-medium">
        {type === "multiple" ? "Multiple Choice" : "True or False"}
      </h2>
      <p className="font-medium capitalize">Difficulty: {difficulty}</p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur eius
        quisquam hic. A, ad vel!
      </p>
      <div className="flex justify-center">
        <button
          className="text-bold rounded-md bg-red-500 px-4 py-2 font-bold text-white duration-150 hover:scale-110 active:scale-90"
          onClick={() => setIsPlay(true)}
        >
          Start
        </button>
      </div>
    </>
  );
}
