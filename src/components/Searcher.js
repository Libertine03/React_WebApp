import React from 'react';

class Searcher extends React.Component {
    render() {
        return(
            <div className="searchBar">
                    <input className="searcherInput" placeholder="Enter the name of the movie" id="searchBar"/>
                    <button className="search" type="button" onClick={this.props.onSearch}>Search</button>
            </div>
        )
    }
}

export default Searcher