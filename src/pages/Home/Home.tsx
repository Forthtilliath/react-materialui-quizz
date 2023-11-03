import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { CATEGORIES, DIFFICULTIES } from "../../data/gameOptions";
import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { Category, Difficulty, useGameStore } from "../../stores/gameStore";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const rename = useUserStore((s) => s.rename);
  const setOptions = useGameStore((s) => s.setOptions);
  const resetGame = useGameStore((s) => s.reset);

  const [error, setError] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    resetGame();

    const formData = new FormData(e.currentTarget);
    const { name, category, difficulty } = Object.fromEntries(formData);

    if (
      !isStringAndNotEmpty(name) ||
      !isStringAndNotEmpty<Category>(category) ||
      !isStringAndNotEmpty<Difficulty>(difficulty)
    ) {
      setError(true);
      return;
    }

    setError(false);

    rename(name);
    setOptions(category, difficulty);
    navigate(`/quiz?category=${category}&difficulty=${difficulty}`)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="content">
        <div className="settings">
          <span>Quiz Settings</span>

          <div className="settings__select">
            {error && <ErrorMessage>Please fill all the field</ErrorMessage>}
            <TextField
              label="Enter your name"
              variant="outlined"
              style={{ marginBottom: 25 }}
              name="name"
              defaultValue={""}
            />
            <TextField
              select
              label="Select Category"
              variant="outlined"
              style={{ marginBottom: 30 }}
              name="category"
              defaultValue={""}
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Select difficulty"
              variant="outlined"
              style={{ marginBottom: 30 }}
              name="difficulty"
              defaultValue={""}
            >
              {DIFFICULTIES.map((difficulty, key) => (
                <MenuItem key={key} value={difficulty}>
                  {capitalize(difficulty)}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Start Quiz
            </Button>
          </div>
        </div>

        <img src="/assets/images/quiz.svg" alt="quiz" className="banner" />
      </div>
    </form>
  );
};

export default Home;

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function isStringAndNotEmpty<T extends string>(value: any): value is T {
  return typeof value === "string" && value.length > 0;
}
