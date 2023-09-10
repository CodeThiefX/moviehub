import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";

import "./App.css";
import SearchIcon from './search.svg'

const API_URL = 'http://www.omdbapi.com?apikey=3aafd367';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const reponse = await fetch(`${API_URL}&s=${title}`);
        const data = await reponse.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('movie');
    }, []);

    return (
        <div className="app">
            <h1>MovieHub</h1>

            <div className="search">
                <input
                    placeholder="Search for a movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard key={movie.imdbID} movie={movie} />
                            ))}
                        </div>
                    )
                    : (
                        <div>
                            <h2>No movies found</h2>
                        </div>
                    )
            }
        </div>
    );
}

export default App;