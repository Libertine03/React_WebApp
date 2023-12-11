import './App.css';
import Header from './components/Header';
import FilmsList from './components/FilmsList';
import React from 'react';

class App extends React.Component {

  render() {
    return(
      <div>
        <Header />
        <FilmsList />
      </div>
    )
  }
}

export default App;

