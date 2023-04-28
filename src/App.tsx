import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import AppMain from './components/app-main/app-main';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <AppMain />
    </div>
  );
}

export default App;
