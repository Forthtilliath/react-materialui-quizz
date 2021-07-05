import React from 'react';
import './Home.css';
import { TextField, MenuItem, Button } from '@material-ui/core';
import Categories from '../../Data/Categories';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const Home = ({ name, setName, fetchQuestions }) => {
    const difficulties = ['easy', 'medium', 'hard'];
    const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || '';

    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [error, setError] = useState(false);

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category || !difficulty || !name) {
            setError(true);
            return;
        }
        setError(false);
        fetchQuestions(category, difficulty);
        history.push('/quiz');
    };

    return (
        <div className="content">
            <div className="settings">
                <span>Quiz Settings</span>

                <div className="settings__select">
                    {error && <ErrorMessage>Please fill all the field</ErrorMessage>}
                    <TextField
                        label="Enter your name"
                        variant="outlined"
                        style={{ marginBottom: 25 }}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <TextField 
                        select
                        label="Select Category"
                        variant="outlined"
                        style={{ marginBottom: 30 }}
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    >
                        {Categories.map((cat) => (
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
                        onChange={(e) => setDifficulty(e.target.value)}
                        value={difficulty}
                    >
                        {difficulties.map((diff, key) => (
                            <MenuItem key={key} value={diff}>
                                {capitalize(diff)}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
                        Start Quiz
                    </Button>
                </div>
            </div>

            <img src="/assets/images/quiz.svg" alt="quiz" className="banner" />
        </div>
    );
};

export default Home;
