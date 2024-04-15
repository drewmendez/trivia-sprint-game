import { create } from "zustand";

type GameStore = {
  isGameStarted: boolean;
  setIsGameStarted: () => void;
};

export const useGame = create<GameStore>((set) => ({
  isGameStarted: false,
  setIsGameStarted: () => {
    set({ isGameStarted: true });
  },
}));

type QuizStore = {
  quizItems: [];
  fetchQuizItems: (difficulty: string, type: string) => void;
};

export const useQuiz = create<QuizStore>((set) => ({
  quizItems: [],
  fetchQuizItems: async (difficulty, type) => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=${type}`,
      );
      const data = await response.json();

      if (!response.ok) {
        console.log("404");
      }

      set({ quizItems: data.results });
    } catch (error) {
      console.log(error);
    }
  },
}));
