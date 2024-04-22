import { useGame } from "./store";
import CategoryView from "./components/CategoryView/CategoryView";
import Header from "./components/Header";
import Quiz from "./components/Quiz/Quiz";

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
