import React from 'react';

class FilmsView extends React.Component {
    elementsFounded = 7;
    render(){
      return(
        <section className="windowForFilms">
            <div className="films">
                <div className="searchBar">
                    <input className="searcherInput" placeholder="Введите название фильма" />
                    <button className="search" type="button" onClick={() => console.log("Поиск")}>Искать</button>
                </div>
                <div className="filmsList" id="film">
                    
                </div>
                <div className="footerFilms">
                    <span>Найдено {this.elementsFounded} элементов</span>
                    <button onClick={this.addElementToList}><i className="bi bi-plus-lg"></i>Добавить</button>
                </div>
            </div>
        </section>
      )
    }

    addElementToList() {
        var i = 0;
        var list = document.getElementById("film");
        var new_ = document.createElement("div");
        new_.textContent = 'Привет'+i;
        new_.className = 'film';
        list.appendChild(new_);
        i = i+1;
    }
  }
  export default FilmsView