export default function StatusHeader({
  questionNumber,
  timeLeft,
  score,
}: {
  questionNumber: number;
  timeLeft: number;
  score: number;
}) {
  return (
    <header className="bg-slate-400 p-2">
      <div className="grid grid-cols-3">
        <div className="-mr-[1px] flex flex-col items-center border border-slate-600">
          <h2>Question</h2>
          <p>{questionNumber}/10</p>
        </div>
        <div className="-mr-[1px] flex flex-col items-center border border-slate-600">
          <h2>Time</h2>
          <Timer timeLeft={timeLeft} />
        </div>
        <div className="flex flex-col items-center border border-slate-600">
          <h2>Score</h2>
          <p>{score}</p>
        </div>
      </div>
    </header>
  );
}

function Timer({ timeLeft }: { timeLeft: number }) {
  const formatTime = (time: number) => {
    const seconds = time % 60;
    return `:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return <p>{formatTime(timeLeft)}</p>;
}
