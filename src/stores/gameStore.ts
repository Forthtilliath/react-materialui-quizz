import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { z } from "zod";
import { CATEGORIES, DIFFICULTIES } from "../data/gameOptions";

const categValues = CATEGORIES.map((c) => c.value).map(convertNumberToString);
assertsArrayNotEmpy(categValues);

export const categories = z.enum(categValues);
export type Category = z.infer<typeof categories>;

export const difficulties = z.enum(DIFFICULTIES);
export type Difficulty = z.infer<typeof difficulties>;

const QuestionSchema = z.object({
  category: z.string().startsWith("Entertainment: "),
  type: z.literal("multiple"),
  difficulty: difficulties,
  question: z.string(),
  correct_answer: z.string(),
  incorrect_answers: z.tuple([z.string(), z.string(), z.string()]),
});
export type Question = z.infer<typeof QuestionSchema>;

interface GameState {
  category: Category | undefined;
  difficulty: Difficulty | undefined;
  setOptions: (newCategory: Category, newDifficulty: Difficulty) => void;

  questions: Question[];
  currentQuestionIndex: number;
  currentQuestion: Question | null;
  setQuestions: (newQuestions: Question[]) => void;
  nextQuestion: () => void;

  score: number;
  incrementScore: () => void;

  reset: () => void;
}

export const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set, get) => ({
        category: undefined,
        difficulty: undefined,
        setOptions: (category, difficulty) => {
          set({ category, difficulty }, undefined, "SET_OPTIONS");
        },

        questions: [],
        currentQuestionIndex: -1,
        currentQuestion: null,
        setQuestions: (questions) => {
          if (get().questions.length > 0) return;
          console.log("setQuestions", questions);
          set({ questions }, undefined, "SET_QUESTIONS");
          get().nextQuestion();
        },
        nextQuestion: () => {
          console.dir("nextQuestion");
          set(
            (state) => ({
              currentQuestionIndex: state.currentQuestionIndex + 1,
              currentQuestion: state.questions[state.currentQuestionIndex + 1],
            }),
            undefined,
            "NEXT_QUESTION"
          );
        },

        score: 0,
        incrementScore: () => {
          set(
            (state) => ({ score: state.score + 1 }),
            undefined,
            "INCREMENT_SCORE"
          );
        },

        reset: () => {
          set(
            {
              category: undefined,
              difficulty: undefined,
              questions: [],
              currentQuestionIndex: -1,
              currentQuestion: null,
              score: 0,
            },
            undefined,
            "RESET"
          );
        },
      }),
      { name: "gameStore" }
    )
  )
);

function assertsArrayNotEmpy<T>(arr: T[]): asserts arr is [T, ...T[]] {
  if (arr.length === 0) {
    throw new Error("Categories array is empty");
  }
}

function convertNumberToString<T extends number>(n: T): `${typeof n}` {
  return n.toString() as `${typeof n}`;
}
