import "./App.css";
import MoviesList from "./components/MoviesList";
import { useEffect, useState,useCallback,useRef } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(true);
  const retryTimeoutRef = useRef(null);

  const fetchDataHandler = useCallback((async () => {
    if (!retrying) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/fil/");
      if (!response.ok) {
        throw new Error("Something went Wrong!");
      }
      const data = await response.json();

      setMovies(data.results);
    } catch (error) {
      setError(error.message);

      retryTimeoutRef.current = setTimeout(() => {
        fetchDataHandler(); 
      }, 5000);
    }finally { 
      setLoading(false);
      }    
    setLoading(false);
  }),[retrying]);

const cancelHandler = () => {
 setRetrying(false);
 if(retryTimeoutRef.current){
  clearTimeout(retryTimeoutRef.current);
 }
 setError("Retrying cancelled.");
}
  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  return (
    <div className="App">
      <div className="container">
        <div>
          <button onClick={() => fetchDataHandler()}>Fetch Movies</button>
          <button onClick={() => cancelHandler()}>Cancel</button>
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
