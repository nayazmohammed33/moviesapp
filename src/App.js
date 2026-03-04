import './App.css';
import MoviesList from './components/MoviesList';
import { useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading,setLoading] =useState(false);
  const fetchDataHandler = async () => {
    setLoading(true);
    const response= await fetch("https://swapi.dev/api/films");
    const data= await response.json(); 
    setMovies(data.results);
    setLoading(false);
  }
  return (
    <div className="App">
      <div className="container">
        <div>
          <button onClick={() => fetchDataHandler()}>Fetch Movies</button>
        </div>
        <div className="movies">
          {/* <MoviesList movies={movies} /> */}
          {loading &&  <p>Loading movies...  </p>}
          {!loading && movies.length>0 && movies.map((movie) => (
              <MoviesList key={movie.episode_id} title={movie.title} openingText={movie.opening_crawl} releaseDate={movie.release_date} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
