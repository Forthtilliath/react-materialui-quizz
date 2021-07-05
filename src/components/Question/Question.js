import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Question.css';

const Question = ({ currQues, setCurrQues, questions, options, correct, setScore, score, setQuestions }) => {
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);

    const history = useHistory();

    const handleSelect = (i) => {
        return selected === i && selected === correct
            ? 'select'
            : selected === i && selected !== correct
            ? 'wrong'
            : i === correct
            ? 'select'
            : '';
    };

    const handleCheck = (i) => {
        setSelected(i);
        if (i === correct) setScore(score + 1);
        setError(false);
    };

    const handleQuit = () => {
        setCurrQues(0);
        setQuestions();
        history.push('/');
    };

    const handleNext = () => {
        // 9 + la question 0 => 10
        if (currQues >= 9) history.push('/result');
        else if (selected) {
            setCurrQues(currQues + 1);
            setSelected();
        } else setError('Please select an option first');
    };

    return (
        <div className="question">
            <h1>Question {currQues + 1}</h1>

            <div className="singleQuestion">
                <h2>{questions[currQues].question}</h2>

                <div className="options">
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {options &&
                        options.map((option, key) => (
                            <button
                                onClick={() => handleCheck(option)}
                                className={`singleOption ${selected && handleSelect(option)}`}
                                key={key}
                                disabled={selected}
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
