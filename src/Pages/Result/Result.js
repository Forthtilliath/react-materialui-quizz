import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Result.css'

const Result = ({ name, score }) => {
    const history = useHistory();

    useEffect(() => {
        if (!name) {
            history.push('/');
        }
    }, [history, name]);

    return (
        <div className="result">
            <span className="title">{name}</span>
            <span className="title">Final Score : {score}</span>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{ alignSelf: 'center', marginTop: 20 }}
                onClick={() => history.push('/')}
            >Go To Homepage</Button>
        </div>
    );
};

export default Result;
