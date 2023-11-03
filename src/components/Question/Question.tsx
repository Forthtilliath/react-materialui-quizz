import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { type Question, useGameStore } from "../../stores/gameStore";
import "./Question.css";

const Question = ({
  question,
  correct_answer,
  incorrect_answers,
}: Pick<Question, "question" | "correct_answer" | "incorrect_answers">) => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState("");
  const currentQuestionIndex = useGameStore((s) => s.currentQuestionIndex);
  const nextQuestion = useGameStore((s) => s.nextQuestion);
  const incrementScore = useGameStore((s) => s.incrementScore);
  const resetGame = useGameStore((s) => s.reset);

  const [options, setOptions] = useState<string[]>([]);

  const handleShuffle = (options: string[]) =>
    options.sort(() => Math.random() - 0.5);

  useEffect(() => {
    setOptions(handleShuffle([correct_answer, ...incorrect_answers]));
  }, [correct_answer, incorrect_answers]);

  const getSelectedOptionClasses = (option: string) => {
    if (!selected) return "";
    if (option !== selected) return "";
    return option === correct_answer ? "goodAnswer" : "wrongAnswer";
  };

  const handleCheck = (option: string) => {
    setSelected(option);
    if (option === correct_answer) incrementScore();
    setError("");
  };

  const handleQuit = () => {
    resetGame();
    navigate("/");
  };

  const handleNext = () => {
    if (selected) {
      nextQuestion();
      setSelected(null);
    } else {
      setError("Please select an option first");
    }
  };

  return (
    <div className="question">
      <h1>Question {currentQuestionIndex + 1}</h1>

      <div className="singleQuestion">
        <h2>{question}</h2>

        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((option, key) => (
              <button
                onClick={() => handleCheck(option)}
                className={`singleOption ${getSelectedOptionClasses(option)}`}
                key={key}
                disabled={selected !== null}
              >
                {option}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            onClick={handleQuit}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            Next Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
