import * as React from 'react';
import {HeaderBar} from './components/Header';
import {TabNavigation} from './components/TabNavigation';
import './App.css';
import './index.scss';

function App() {
  return (
    <div className="App">
      <HeaderBar />
      <TabNavigation />
    </div>
  );
}

export default App;
