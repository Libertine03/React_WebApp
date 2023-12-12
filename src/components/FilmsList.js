import React from 'react';
import axios from "axios";

class FilmsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            elementsFounded: 146,
            textId: 2,
            image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg",
            filmTitle: "The Cotton Club",
            director: "Francis Ford Coppola",
            actors: "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee",
            year: 1984,
            genres:  [
              "Crime",
              "Drama",
              "Music"
            ],
            runtime: 127,
            plot: "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.",
            rating: 10,
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
                    <button onClick={() => {console.log('Добавление')}}><i className="bi bi-plus-lg"></i>Добавить</button>
                </div>
            </div>
            <div className='filmsView' id="allFilmView">
              <div className="idAndEditButtons">
                <button className="filmId" onClick={() => this.copyToClipboard(this.state.textId)}>Id: {this.state.textId} <i className="bi bi-copy"></i></button>
                <button className='editMovie'><i class="bi bi-pencil-square"></i> Редактировать</button>
              </div>
              
              <div className='movieLogo'>
                <div classname="Logo"><img src={this.state.image} width="250" height="350" alt="Poster URL"></img></div>
                <div className='Title'>
                  <h2>{this.state.filmTitle}</h2>
                  <h4>{this.state.director}</h4>

                  <div className='filmParameters'>
                        <div className='Parameters'>
                          <h3 style={{paddingTop: 30}}>О фильме</h3>
                          <div className='parameterValues'>
                            <span className="typeOfparameter">Год производства:</span><span>{this.state.year}</span>
                            <span className="typeOfparameter">Жанры:</span><span>{this.state.genres + ""}</span>
                            <span className="typeOfparameter">Длительность:</span><span>{this.state.runtime} мин.</span>
                            <span className="typeOfparameter">Идентификатор:</span><span>{this.state.textId}</span>
                          </div>
                        </div>
                        <span style={{paddingTop: 30}}>В главных ролях: {this.state.actors}</span>
                  </div>

                </div>

              </div>
              <div className='descriptionMovie'>
                <span className='descriptionTitle'>Описание</span><br></br>
                <span className='descriptionText'>{this.state.plot}</span><br></br><br></br>
                <span className='descriptionText'>Текущий рейтинг: {this.state.rating}</span>
              </div>
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
          new_movie.addEventListener('click', () => {
            this.showMovie(index+1);
          });

          var title = document.createElement('span');
          title.textContent = arr[index]["title"];

          var yearAndGenres = document.createElement('p');
          yearAndGenres.textContent = arr[index]["year"] + ' | ' + arr[index]["genres"];

          new_movie.appendChild(title);
          new_movie.appendChild(yearAndGenres);

          list.appendChild(new_movie);
    }

    showMovie = (movieId) => {
      this.setState({textId: movieId});
      this.setState({image: this.state.movies[movieId-1]["posterUrl"]});
      this.setState({filmTitle: this.state.movies[movieId-1]["title"]});
      this.setState({director: this.state.movies[movieId-1]["director"]});
      this.setState({actors: this.state.movies[movieId-1]["actors"]});
      this.setState({year: this.state.movies[movieId-1]["year"]});
      this.setState({genres: this.state.movies[movieId-1]["genres"]});
      this.setState({runtime: this.state.movies[movieId-1]["runtime"]});
      this.setState({plot: this.state.movies[movieId-1]["plot"]});
      this.setState({rating: Math.floor(Math.random() * (10-1) + 1)})
    }

    copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        alert("Скопировано в буфер обмена!");
      });
    }
  }
  export default FilmsList