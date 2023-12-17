import React from 'react';
import axios from "axios";
import Movie from './Movie';
import Searcher from './Searcher';
import FilmView from './FilmView/FilmView';
import Footer from './Footer';
import { Route, Routes} from "react-router-dom"
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';

class Movies extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            elementsSearched: 0,
            id: 0,
            image: "",
            title: "",
            director: "",
            actors: "",
            year: 2000,
            genres:  [],
            runtime: 100,
            plot: "",
            rating: 10,
        }

        this.showMovie = this.showMovie.bind(this)
        this.AddMovie = this.AddMovie.bind(this)
        this.EditMovie = this.EditMovie.bind(this)
    }

    componentDidMount() {
        axios
          .get("http://localhost:3001/movies")  
          .then(res => {
            this.setState({ movies: res.data, elementsSearched: res.data.length });
          })
          .then(() => {
            this.setState({id: this.state.movies[1].id,
                          image: this.state.movies[1].posterUrl,
                          title: this.state.movies[1].title,
                          director: this.state.movies[1].director,
                          actors: this.state.movies[1].actors,
                          year: this.state.movies[1].year,
                          genres: this.state.movies[1].genres,
                          runtime: this.state.movies[1].runtime,
                          plot: this.state.movies[1].plot,
                          rating: Math.floor(Math.random() * (10-1) + 1)});
          })
          .catch(err => {
            console.log(err);
          });
      }

    render() {
        return(
            <div className="windowForFilms">
                <div className="films">

                    <Searcher onSearch={this.searchMovies}/>

                    <div className="filmsList" id="film">
                        {this.state.movies.map((el) => (
                            <Movie key={el.id} movie={el} onMovieShow={(id) => this.showMovie(id)} />
                        ))}
                    </div>

                    <Footer elementsSearched={this.state.elementsSearched}/>
                </div>
          <Routes>
           <Route path="/" element={<FilmView id={this.state.id}
                      image={this.state.image}
                      title={this.state.title}
                      director={this.state.director}
                      actors={this.state.actors}
                      year={this.state.year}
                      genres={this.state.genres}
                      runtime={this.state.runtime}
                      plot={this.state.plot}
                      rating={this.state.rating}/>} />

            <Route path="create" element={<AddMovie onAdd={this.AddMovie}/>}/>
            <Route path={"/edit/"+this.state.id} element={<EditMovie onEdit={this.EditMovie} movie_data={this.state.movies[this.state.id-1]}/>}/>
          </Routes>
          </div>
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
              this.createButtonMovie(this.state.movies, index, list);
              found_elements++;
            }
            this.setState({elementsSearched: found_elements});
            return;
        }
  
        for(let index = 0; index < this.state.movies.length; ++index)
        {
            if(this.state.movies[index]["title"].includes(searchBar))
            {
              this.createButtonMovie(this.state.movies, index, list);
              found_elements++;
            }
        }
        this.setState({elementsSearched: found_elements});
      }
      createButtonMovie = (arr, index, list) => {
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

      showMovie(movieId) {  
        this.setState({id: movieId,
                      image: this.state.movies[movieId-1]["posterUrl"],
                      title: this.state.movies[movieId-1]["title"],
                      director: this.state.movies[movieId-1]["director"],
                      actors: this.state.movies[movieId-1]["actors"],
                      year: this.state.movies[movieId-1]["year"],
                      genres: this.state.movies[movieId-1]["genres"],
                      runtime: this.state.movies[movieId-1]["runtime"],
                      plot: this.state.movies[movieId-1]["plot"],
                      rating: Math.floor(Math.random() * (10-1) + 1)});
      }

      AddMovie(movie) {
        const id = this.state.movies.length + 1;
        this.setState({ movies: [...this.state.movies, {id, ...movie}],
                        elementsSearched: this.state.elementsSearched + 1});
        
        const new_movie = {
          id: id,
          title: movie.title,
          year: movie.year,
          runtime: Math.floor(Math.random() * (150-60) + 60),
          genres: movie.genres,
          director: movie.director,
          actors: movie.actors,
          plot: movie.plot,
          posterUrl: movie.image
        }
        
        fetch('http://localhost:3001/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(new_movie),
        })
        .then(response => response.json())
        .then((data) => {
          console.log('Added new data to json-server:', data);
        })
        .catch((error) => console.error('Error adding data:', error))
      }

      EditMovie(movie) {
        const new_movie = {
          id: movie.id,
          title: movie.title,
          year: movie.year,
          runtime: Math.floor(Math.random() * (150-60) + 60),
          genres: movie.genres,
          director: movie.director,
          actors: movie.actors,
          plot: movie.plot,
          posterUrl: movie.image
        }
        
        fetch('http://localhost:3001/movies/'+movie.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(new_movie),
        })
        .then(response => response.json())
        .then((data) => {
          console.log('Updated data:', data);
        })
        .catch((error) => console.error('Error updating data:', error))
      }
}

export default Movies