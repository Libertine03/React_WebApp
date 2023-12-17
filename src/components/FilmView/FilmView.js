import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FilmView extends Component {
  render() {
    return (
        <div className='filmsView' id="allFilmView">
        <div className="idAndEditButtons">
          <button className="filmId" onClick={() => this.copyToClipboard(this.props.id)}>Id: {this.props.id} <i className="bi bi-copy"></i></button>
          <Link to={"/edit/"+this.props.id}>
            <button className='editMovie' style={{marginLeft: 150}}><i className="bi bi-pencil-square"></i> Edit</button>
          </Link>
        </div>
        
        <div className='movieLogo'>
          <div className="Logo"><img src={this.props.image} width="250" height="350" alt="Poster URL"></img></div>
          <div className='Title'>
            <h2>{this.props.title}</h2>
            <h4>{this.props.director}</h4>

            <div className='filmParameters'>
                  <div className='Parameters'>
                    <h3 style={{paddingTop: 30}}>About the film</h3>
                    <div className='parameterValues'>
                      <span className="typeOfparameter">Year:</span><span>{this.props.year}</span>
                      <span className="typeOfparameter">Genres:</span><span>{this.props.genres + ""}</span>
                      <span className="typeOfparameter">Runtime:</span><span>{this.props.runtime} мин.</span>
                      <span className="typeOfparameter">ID:</span><span>{this.props.id}</span>
                    </div>
                  </div>
                  <span style={{paddingTop: 30}}>Starring in the film: {this.props.actors + ''}</span>
            </div>

          </div>

        </div>
        <div className='descriptionMovie'>
          <span className='descriptionTitle'>Plot</span><br></br>
          <span className='descriptionText'>{this.props.plot}</span><br></br><br></br>
          <span className='descriptionText'>Rating of the film: {this.props.rating}</span>
        </div>
    </div>
    );
  }

  copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Скопировано в буфер обмена!");
    });
  }
}

export default FilmView;