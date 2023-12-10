import React from 'react';

class Header extends React.Component {
  render() {
    return(
      <header>
        <h1>Админка фильмотеки</h1>
        <div className="Creator">
            <h2>Черепанов Павел</h2>
        </div>
      </header>
    )
  }
}

export default Header