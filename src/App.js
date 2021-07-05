import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import Result from './Pages/Result/Result';
import Quiz from './Pages/Quiz/Quiz';
import { useState } from 'react';
import axios from 'axios';

function App() {
    const [name, setName] = useState('Forth');
    const [questions, setQuestions] = useState();
    const [score, setScore] = useState(0);

    const fetchQuestions = async (category = '', difficulty = '') => {
        const cat = category ? `&category=${category}` : ``;
        const diff = difficulty ? `&difficulty=${difficulty}` : ``;
        const { data } = await axios.get(`https://opentdb.com/api.php?amount=10${cat}${diff}&type=multiple`);
        setQuestions(data.results);
    };

    return (
        <BrowserRouter>
            <div className="app" style={{ backgroundImage: 'url(/assets/images/ques1.png' }}>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Home component={Home} name={name} setName={setName} fetchQuestions={fetchQuestions} />
                    </Route>
                    <Route path="/quiz" exact>
                        <Quiz
                            name={name}
                            questions={questions}
                            score={score}
                            setScore={setScore}
                            setQuestions={setQuestions}
                        />
                    </Route>
                    <Route path="/result" exact><Result name={name} score={score} /></Route>
                    <Redirect to="/" />
                </Switch>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
