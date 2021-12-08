import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/play" component={ Game } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
