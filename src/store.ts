import { create } from "zustand";

type GameStore = {
  isGameStarted: boolean;
  startGame: () => void;
};

export const useGame = create<GameStore>((set) => ({
  isGameStarted: false,
  startGame: () => {
    set({ isGameStarted: true });
  },
}));

interface QuizItem {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

type QuizStore = {
  quizItems: QuizItem[];
  type: string;
  difficulty: string;
  fetchQuizItems: (difficulty: string, type: string) => void;
};

export const useQuiz = create<QuizStore>((set) => ({
  quizItems: [],
  type: "",
  difficulty: "",
  fetchQuizItems: async (difficulty, type) => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&${type === "boolean" ? "" : "category=9"}&difficulty=${difficulty}&type=${type}`,
      );
      const data = await response.json();

      if (!response.ok) {
        console.log("404");
        return;
      }

      set({ quizItems: data.results, type: type, difficulty: difficulty });
    } catch (error) {
      console.log(error);
    }
  },
}));
