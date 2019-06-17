import React from 'react';
import SearchBox from './components/searchBox';
import './App.css';

function App() {
  return (
    <div className="App">
        <header>
            Giphy Random
        </header>
        <div className={'content'}>
            <SearchBox />
        </div>
        <footer>
            Test React App
        </footer>
    </div>
  );
}

export default App;
