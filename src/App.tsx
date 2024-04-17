import CategoryView from "./components/CategoryView/CategoryView";
import Header from "./components/Header";
import Quiz from "./components/Quiz/Quiz";
import { useGame } from "./store";

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
