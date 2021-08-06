import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.performSearch("")
  }

  performSearch(searchTerm) {
    console.log("Perform search using moviedb")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully")
        
        const results = searchResults.results
      
        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
        
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }

  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="50" src="https://image.flaticon.com/icons/png/128/633/633832.png"/>
              </td>
              <td width="8px"/>
              <td>
                <h1>MoviesDB Search</h1>
              </td>
              <td>
                <img alt="app icon" width="50" src="https://image.flaticon.com/icons/png/128/633/633832.png"/>
              </td>
              <td width="8px"/>
            </tr>
          </tbody>
        </table>
       
        <input style={{
          fontSize: "24px",
          display: 'block',
          width: "7.5cm",
          textAlign:"center",
          marginLeft:"16.4cm",
          cursor:"pointer",
          name:"search"
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter Movie Name"/>

        {this.state.rows}

      </div>
    );
  }
}

export default App;

 