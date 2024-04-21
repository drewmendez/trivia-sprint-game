interface StatusHeaderProp {
  questionNumber: number;
  timeLeft: number;
  score: number;
  speedBonus: number;
}

export default function StatusHeader({
  questionNumber,
  timeLeft,
  score,
  speedBonus,
}: StatusHeaderProp) {
  return (
    <header className="rounded-lg bg-slate-800 p-2 text-sm text-white">
      <div className="grid  grid-cols-3">
        <div className="-mr-[1px] flex flex-col items-center rounded-bl-md rounded-tl-md border border-white py-2">
          <h2>Question</h2>
          <p className="my-auto text-xl font-semibold">{questionNumber}/10</p>
        </div>
        <div className="relative -mr-[1px] border border-white">
          <div className="flex flex-col items-center py-2">
            <h2>{timeLeft === 0 ? "Time's Up" : "Time"}</h2>
            <Timer timeLeft={timeLeft} />
          </div>
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center bg-green-500 ${speedBonus ? "opacity-100" : "opacity-0"} duration-150`}
          >
            <p className="text-sm">Speed Bonus</p>
            <p>+{speedBonus}</p>
          </div>
        </div>
        <div className="flex flex-col items-center rounded-br-md rounded-tr-md border border-white py-2">
          <h2>Score</h2>
          <p className="my-auto text-xl font-semibold">{score}</p>
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

  return (
    <p
      className={`text-3xl font-semibold ${timeLeft < 6 ? "text-red-500" : "text-green-500"}`}
    >
      {formatTime(timeLeft)}
    </p>
  );
}
