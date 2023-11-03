import CircularProgress from "@mui/material/CircularProgress";
import Question from "../../components/Question/Question";
import { useUserStore } from "../../stores/userStore";
import { useGameStore } from "../../stores/gameStore";
import { useEffect } from "react";
import Result from "../Result/Result";
import { useLoaderData } from "react-router-dom";
import "./Quiz.css";

const Quiz = () => {
  const questionsData = useLoaderData() as Question[];
  const name = useUserStore((s) => s.name);
  const score = useGameStore((s) => s.score);
  const currentQuestionIndex = useGameStore((s) => s.currentQuestionIndex);
  const currentQuestion = useGameStore((s) => s.currentQuestion);
  const setQuestions = useGameStore((s) => s.setQuestions);

  const isQuizFinished = currentQuestionIndex >= 0 && !currentQuestion;

  useEffect(() => {
    console.log("useEffect Quiz");
    setQuestions(questionsData);
  }, []);

  return (
    <div className="quiz">
      <div className="subtitle">Welcome, {name}</div>

      {currentQuestion ? (
        <>
          <div className="quizInfo">
            <span>{currentQuestion.category}</span>
            <span>Score : {score}</span>
          </div>

          <Question
            question={currentQuestion.question}
            correct_answer={currentQuestion.correct_answer}
            incorrect_answers={currentQuestion.incorrect_answers}
          />
        </>
      ) : isQuizFinished ? (
        <Result />
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;
