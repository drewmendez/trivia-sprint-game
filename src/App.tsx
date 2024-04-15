import CategoryView from "./components/CategoryView";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import { useGame } from "./store/gameStore";

function App() {
  const isGameStarted = useGame((state) => state.isGameStarted);

  return (
    <>
      <Header />
      {isGameStarted ? <Quiz /> : <CategoryView />}
    </>
  );
}

export default App;
