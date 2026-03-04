import React, { useState } from "react";
import "./Addmovie.css";

export const Addmovie = (props) => {
  const [newmovie, setNewmovie] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });
  const addMovieHandler = async (movie) => {
    try {
      const response = await fetch(
        "https://reactmovieapp-6f981-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to add movie.");
      }
      if (props.onMovieAdded) { props.onMovieAdded(); }
      const data = await response.json();
      console.log("Movie added:", data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="add-movie">
      <form className="movie-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="input"
            onChange={(e) =>
              setNewmovie({ ...newmovie, title: e.target.value })
            }
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="openingText">Opening Text</label>
          <input
            id="openingText"
            className="input"
            onChange={(e) =>
              setNewmovie({ ...newmovie, openingText: e.target.value })
            }
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="releaseDate">Release Date</label>
          <input
            id="releaseDate"
            className="input"
            onChange={(e) =>
              setNewmovie({ ...newmovie, releaseDate: e.target.value })
            }
            type="date"
          />
        </div>

        <div className="actions">
          <button className="btn add-btn" onClick={() => addMovieHandler(newmovie)}>
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};
