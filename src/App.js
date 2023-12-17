import './App.css';
import Header from './components/Header';
import Movies from './components/Movies';
import React from 'react';

class App extends React.Component {

  render() {
    return(
      <div>
        <Header />
        <Movies />
      </div>
    )
  }
}

export default App;

