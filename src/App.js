import "./App.css";
import MoviesList from "./components/MoviesList";
import { useEffect, useState,useCallback } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDataHandler = useCallback((async () => {
    setLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went Wrong!");
      }
      const data = await response.json();

      setMovies(data.results);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }),[]);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  return (
    <div className="App">
      <div className="container">
        <div>
          <button onClick={() => fetchDataHandler()}>Fetch Movies</button>
        </div>
        <div className="movies">
          {/* <MoviesList movies={movies} /> */}
          {loading && <p>Loading movies... </p>}
          {!loading &&
            movies.length > 0 &&
            movies.map((movie) => (
              <MoviesList
                key={movie.episode_id}
                title={movie.title}
                openingText={movie.opening_crawl}
                releaseDate={movie.release_date}
              />
            ))}
          {!loading && error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
