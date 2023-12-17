import React from 'react';
import { Link } from 'react-router-dom';

class EditMovie extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: props.movie_data.title,
            year: props.movie_data.year,
            plot: props.movie_data.plot,
            image: props.movie_data.posterUrl,
            genres: props.movie_data.genres,
            rating: 1,
            actors: props.movie_data.actors,
            director: props.movie_data.director,
        }   
    }
    render() {
        return(
            <div>
                <form className='addForm'>
                    <h2>Editing a movie</h2>
                    <input value={this.state.title} placeholder='Title' onChange={(e) => this.setState({ title: e.target.value })}/>
                    <input value={this.state.year} type="number" min={1900} max={2024} placeholder='Year (1900 - 2024)' 
                        onChange={(e) => this.setState({ year: e.target.value })}/>

                    <textarea value={this.state.plot} placeholder='Plot' onChange={(e) => this.setState({ plot: e.target.value })}/>
                    <input value={this.state.image} placeholder='Poster Url' onChange={(e) => this.setState({ image: e.target.value })}/>
                    <input value={this.state.rating} type="number" min={1} max={10} placeholder='Rating (1 - 10)' 
                        onChange={(e) => this.setState({ rating: e.target.value })}/>

                    <input value={this.state.genres} placeholder='Genres (split ;)' onChange={(e) => this.setState({ genres: e.target.value.split(";") })}/>
                    <input value={this.state.actors} placeholder='Actors (split ;)' onChange={(e) => this.setState({ actors: e.target.value.split(";") })}/>
                    <input  value={this.state.director} placeholder='Director' onChange={(e) => this.setState({ director: e.target.value })}/>

                    <div className="footerFilmView">
                        <Link to="/">
                            <button style={{height: 30, width: 60}}>Back</button>
                        </Link>

                        <Link to="/">
                            <button type="button" style={{height: 30, width: 60}} onClick={() => this.props.onEdit({
                                id: this.props.movie_data.id,
                                title: this.state.title,
                                year: this.state.year,
                                plot: this.state.plot,
                                genres: this.state.genres,
                                image: this.state.image,
                                rating: this.state.rating,
                                actors: this.state.actors,
                                director: this.state.director
                            })}>Save</button>
                        </Link>
                    </div>
                </form>
            </div>
            
        )
    }
}

export default EditMovie