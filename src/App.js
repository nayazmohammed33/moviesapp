import "./App.css";
import { Addmovie } from "./components/Addmovie";
import MoviesList from "./components/MoviesList";
import { useEffect, useState, useCallback, useRef } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(true);
  const retryTimeoutRef = useRef(null);

  const fetchDataHandler = useCallback(async () => {
    if (!retrying) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://reactmovieapp-6f981-default-rtdb.firebaseio.com/movies.json",
      );
      if (!response.ok) {
        throw new Error("Something went Wrong!");
      }
      const data = await response.json();

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);

      retryTimeoutRef.current = setTimeout(() => {
        fetchDataHandler();
      }, 5000);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  }, [retrying]);

  const cancelHandler = () => {
    setRetrying(false);
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
    setError("Retrying cancelled.");
  };
  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  // const deleteMovieHandler = async (id) => {
  //   try {
  //     const res = await fetch(
  //       `https://reactmovieapp-6f981-default-rtdb.firebaseio.com/movies/${id}.json`,
  //       {
  //         method: "DELETE",
  //       }
  //     );
  //     if (!res.ok) {
  //       throw new Error("Failed to delete movie.");
  //     }
  //     fetchDataHandler();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="App">
      <div className="container">
        <Addmovie onMovieAdded={fetchDataHandler} />
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
              <div>
                <MoviesList
                  key={movie.id}
                  title={movie.title}
                  openingText={movie.openingText}
                  releaseDate={movie.releaseDate}
                  onDelete={() => {
                    fetch(
                      `https://reactmovieapp-6f981-default-rtdb.firebaseio.com/movies/${movie.id}.json`,
                      {
                        method: "DELETE",
                      },
                    )
                      .then((response) => {
                        if (!response.ok) { throw new Error("Failed to delete movie."); }
                        fetchDataHandler();
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }}
                
                />

                
              </div>
            ))}
          {!loading && error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
