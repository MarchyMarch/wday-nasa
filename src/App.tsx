import * as React from 'react';
import {DailyPhoto} from './components/DailyPhoto';
import {HeaderBar} from './components/Header';
import './App.css';
import './index.scss';

function App() {
  return (
    <div className="App">
      <HeaderBar />
      <DailyPhoto />
    </div>
  );
}

export default App;
