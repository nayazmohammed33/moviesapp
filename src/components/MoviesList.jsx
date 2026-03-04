import React from 'react'
import './MoviesList.css'

const MoviesList = (props) => {
  return (
    <div className="movies-list">   
      <h2 className="movie-title">{props.title}</h2>
      <p className="opening-text">{props.openingText}</p>
      <p className="release-date">{props.releaseDate}</p>
      <button onClick={props.onDelete}>Delete</button>
    </div>
  )
}

export default MoviesList
