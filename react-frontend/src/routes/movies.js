import React, { Component } from "react";
import { ShoppingCart, Search } from "react-feather";
import "../assets/movies.css";
import Logo from '../assets/logo.png';
import NoImage from '../assets/imagenf.png';
import axios from "axios";
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";



class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "fd17834fbad9e4168715ef1a542d7bce",
            search: "",
            movies: []
        }
    }

    // Get Trending Movies
    componentDidMount = () => {
        // url to get the trending movies from the public api
        const trending = `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.state.key}`
        // actual get request to fetch the movies
        axios.get(trending)
            .then(response => {
                // handle success
                console.log(response.data);
                // results = trending movies array
                this.setState({ movies: response.data.results });
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }

    getMovies = (e) => {
        console.log(e.target.className);
        console.log("clicked");
    }

    search = (e) => {
        this.setState({ search: e.target.value })
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.state.key}&language=en-US&page=1&include_adult=false&query=${e.target.value}`;
        axios.get(url)
            .then(response => {
                // handle success
                console.log(response.data);
                // results = trending movies array
                this.setState({
                    movies: response.data.results
                });
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }
    // Dissmiss keyboard when the user presses the enter key
    dismissKeyboard = (e) => {
        if (e.key === "Enter") {
            console.log(e.target);
            e.target.blur();
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="bar" >
                    <div className="nav">
                        <img className="logo" src={Logo} alt="logo" />
                        <h1 className="logo-header">MOVIESDB STORE</h1>
                        <ShoppingCart color="gray" size={30} style={{ position: "absolute", right: 15 }} />
                    </div>
                    <input className="search" type="text" name="search"
                        spellCheck="false" autoCorrect="false"
                        autoCapitalize="false" autoComplete="false"
                        value={this.state.search}
                        placeholder="search for a movie"
                        onKeyDown={this.dismissKeyboard}
                        onChange={this.search}
                    />
                    <Search color="white" size={20} className="search-logo" />
                </div>
                <div className="movies-container">
                    {/* List of Buttons to get movies */}
                    <div className="links-list">
                        <button className="get-btn get-btn-on" onClick={this.getMovies}>TRENDING
                         </button>
                        <button onClick={this.getMovies} className="get-btn">UPCOMING</button>
                        <button onClick={this.getMovies} className="get-btn">TOP</button>
                    </div>
                    {/* Movies Array */}
                    {this.state.movies ? this.state.movies.map((movie, i) => (
                        <div className="movie" key={i}>
                            <div className="poster-overlay" />
                            <img alt="poster" src={movie.poster_path || movie.backdrop_path ?
                                `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}` :
                                NoImage
                            }
                                className="movie-poster" />
                            <div className="movie-info">
                                <CircularProgressbar
                                    value={movie.vote_average * 10}
                                    text={`${movie.vote_average * 10}%`}
                                    className="rating-circle"
                                    styles={buildStyles({
                                        textColor: "white",
                                        pathColor: "#00D474",
                                        trailColor: "gray",
                                        textSize: 25,
                                    })}
                                />
                                <div className="name-date">
                                    <h3 className="movie-name">{movie.title}</h3>
                                    <h4 className="movie-date">{movie.release_date}</h4>
                                </div>
                            </div>
                        </div>
                    )) : null}
                </div>
            </React.Fragment>
        )
    }
}


export default Movies;