import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg'
import Movie from './components/Movie';


const API_URL = 'http://www.omdbapi.com?apikey=299e95d8'


function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Batman");

  const searchMovies = async (title) =>{
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);

  }

  useEffect(() => {

    searchMovies(searchTerm)
  }, []);

  return (
    <div className="app">
      <h1>MovieLoop</h1>
      <div className="search">
          <input placeholder="Search for Movies" value={searchTerm} onChange={(e) =>{setSearchTerm(e.target.value)}}/>
          <img src={SearchIcon} alt="Search" onClick={() =>{searchMovies(searchTerm ===""? "Batman":searchTerm)}}/>       
      
      </div>
      { movies.length >0
        ? (
          <div className="container">          
            {movies.map((movie) => (
              <Movie movie={movie}/>
            ))}    
          </div>
        ) : (
          <div className="empty">          
            <h3>No movies found</h3>   
          </div>
        )
      }
      

    </div>
  );
}

export default App;
