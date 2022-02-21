import React, {useState}  from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom'
import LandingPage from './LandingPage';
import Login from './Login';

function App() {
    const [activeCard, setActiveCard] = useState('FirstCard');

    return ( 
        <div>
            <nav>
                <button onClick={() => setActiveCard("FirstCard")}>Back</button>
            </nav>
            <div>
                {activeCard === 'FirstCard' && <Login setActiveCard={setActiveCard}></Login>}
                {activeCard === "SecondCard" && <LandingPage></LandingPage>}
            </div>
        </div>
    );
}

export default App;