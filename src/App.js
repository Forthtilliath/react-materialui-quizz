import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import Result from './Pages/Result/Result';
import Quiz from './Pages/Quiz/Quiz';

function App() {
    return (
        <BrowserRouter>
            <div className="app" style={{ backgroundImage: 'url(/assets/images/ques1.png' }}>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/quiz" exact component={Quiz} />
                    <Route path="/result" exact component={Result} />
                    <Redirect to="/" />
                </Switch>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
