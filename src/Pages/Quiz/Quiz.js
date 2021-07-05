import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import './Quiz.css';
import Question from '../../components/Question/Question';

const Quiz = ({ name, score, setScore, questions, setQuestions }) => {
    const [options, setOptions] = useState();
    const [currQues, setCurrQues] = useState(0);

    const handleShuffle = (options) => options.sort(() => Math.random() - 0.5);

    useEffect(() => {
        setOptions(
            questions &&
                handleShuffle([questions[currQues]?.correct_answer, ...questions[currQues]?.incorrect_answers]),
        );
    }, [currQues, questions]);
    return (
        <div className="quiz">
            <div className="subtitle">Welcome, {name}</div>

            {questions ? (
                <>
                    <div className="quizInfo">
                        <span>{questions[currQues].category}</span>
                        <span>Score : {score}</span>
                    </div>

                    <Question
                        currQues={currQues}
                        setCurrQues={setCurrQues}
                        questions={questions}
                        options={options}
                        correct={questions[currQues]?.correct_answer}
                        score={score}
                        setScore={setScore}
                        setQuestions={setQuestions}
                    />
                </>
            ) : (
                <CircularProgress style={{ margin: 100 }} color="inherit" size={150} thickness={1} align="center" />
            )}
        </div>
    );
};

export default Quiz;
