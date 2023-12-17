import React from 'react';
import { Link } from 'react-router-dom';

class Movie extends React.Component {
    movie = this.props.movie
    render() {
        return(
            <Link to="/">
                <button className='film' onClick={() => this.props.onMovieShow(this.movie.id)}>
                    <span>{this.movie.title}</span>
                    <p>{this.movie.year} | {this.movie.genres + ""}</p>
                </button>
            </Link>
        )
    }
}

export default Movie