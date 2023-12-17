import React from 'react';
import { Link } from 'react-router-dom';

class AddMovie extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
            year: 2000,
            plot: "",
            image: "",
            genres: [],
            rating: 1,
            actors: [],
            director: "",
        }   
    }
    render() {
        return(
            <div>
                <form className='addForm'>
                    <h2>Adding a movie</h2>
                    <input placeholder='Title' onChange={(e) => this.setState({ title: e.target.value })}/>
                    <input type="number" min={1900} max={2024} placeholder='Year (1900-2024)' 
                        onChange={(e) => this.setState({ year: e.target.value })}/>

                    <textarea placeholder='Plot' onChange={(e) => this.setState({ plot: e.target.value })}/>
                    <input placeholder='Poster Url' onChange={(e) => this.setState({ image: e.target.value })}/>
                    <input type="number" min={1} max={10} placeholder='Rating (1-10)' 
                        onChange={(e) => this.setState({ rating: e.target.value })}/>

                    <input placeholder='Genres (Split by ;)' onChange={(e) => this.setState({ genres: e.target.value.split(";") })}/>
                    <input placeholder='Actors (Split by ;)' onChange={(e) => this.setState({ actors: e.target.value.split(";") })}/>
                    <input placeholder='Director' onChange={(e) => this.setState({ director: e.target.value })}/>

                    <div className="footerFilmView">
                        <Link to="/">
                            <button style={{height: 30, width: 60}}>Back</button>
                        </Link>

                        <Link to="/">
                            <button type="button" style={{height: 30, width: 60}} onClick={() => this.props.onAdd({
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

export default AddMovie