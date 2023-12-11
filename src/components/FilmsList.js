import React from 'react';
import axios from "axios";

class FilmsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            elementsFounded: 146,
            textId: 0,
        }

        this.searchMovies = this.searchMovies.bind(this)
        this.showMovie = this.showMovie.bind(this)
    }

    componentDidMount() {
        axios
          .get("http://localhost:3001/movies")
          .then(res => {
            this.setState({ movies: res.data });
          })
          .catch(err => {
            console.log(err);
          });
      }

    render(){
      return(
        <section className="windowForFilms">
            <div className="films">
                <div className="searchBar">
                    <input className="searcherInput" placeholder="Введите название фильма" id="searchBar"/>
                    <button className="search" type="button" onClick={this.searchMovies}>Искать</button>
                </div>

                <div className="filmsList" id="film">
                {this.state.movies.map(movie => {   
                    return <button className='film' key={movie.id} onClick={() => this.showMovie(movie.id)}>
                                <span>{movie.title}</span>
                                <p>{movie.year} | {movie.genres + ""}</p>
                            </button>;
                })}
                </div>

                <div className="footerFilms">
                    <span>Найдено {this.state.elementsFounded} элементов</span>
                    <button onClick={this.addElementToList}><i className="bi bi-plus-lg"></i>Добавить</button>
                </div>
            </div>
            <div className='filmsView'>
              <button className="filmId" onClick={() => this.copyToClipboard(this.state.textId)}>Id: {this.state.textId} <i className="bi bi-copy"></i></button>
            </div>
        </section>
      )
    }

    searchMovies = () => {
      var list = document.getElementById("film"); /* Список на отображение */
      var found_elements = 0;
      while(list.firstChild) {
        list.removeChild(list.firstChild);
      }

      var searchBar = document.getElementById("searchBar").value;

      //Если ничего не вбили, выводим все элементы
      if(searchBar === "")
      {
          for(let index = 0; index < this.state.movies.length; ++index)
          {
            this.addNewMovie(this.state.movies, index, list);
            found_elements++;
          }
          this.setState({elementsFounded: found_elements});
          return;
      }

      for(let index = 0; index < this.state.movies.length; ++index)
      {
          if(this.state.movies[index]["title"].includes(searchBar))
          {
            this.addNewMovie(this.state.movies, index, list);
            found_elements++;
          }
      }
      this.setState({elementsFounded: found_elements});
    }
    addNewMovie = (arr, index, list) => {
          var new_movie = document.createElement('button');
          new_movie.className = 'film';

          var title = document.createElement('span');
          title.textContent = arr[index]["title"];

          var yearAndGenres = document.createElement('p');
          yearAndGenres.textContent = arr[index]["year"] + ' | ' + arr[index]["genres"];

          new_movie.appendChild(title);
          new_movie.appendChild(yearAndGenres);

          list.appendChild(new_movie);
    }

    showMovie = (movieId) => {
      this.setState({textId: movieId})
    }

    copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        alert("Скопировано в буфер обмена!");
      });
    }
  }
  export default FilmsList