import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
        <div className="footerFilms">
        <span>Movies found: {this.props.elementsSearched}</span>
        <Link to="create">
        <button style={{height: 30}}><i className="bi bi-plus-lg"></i>Add</button>
        </Link>
    </div>
    );
  }
}

export default Footer;