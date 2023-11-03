import Button from "@mui/material/Button";
import { useEffect } from "react";
import "./Result.css";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { useGameStore } from "../../stores/gameStore";

const Result = () => {
  const navigate = useNavigate();
  const name = useUserStore((s) => s.name);
  const score = useGameStore((s) => s.score);

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name]);

  return (
    <div className="result">
      <span className="title">{name}</span>
      <span className="title">Final Score : {score}</span>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        onClick={() => navigate("/")}
      >
        Go To Homepage
      </Button>
    </div>
  );
};

export default Result;
