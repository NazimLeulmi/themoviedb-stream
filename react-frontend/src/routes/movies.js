import React, { Component } from "react";
import { Menu, X } from "react-feather";
import Search from "./components/search";
import Movie from "./components/movie";
import NavMenu from "./components/nav";
import "../assets/movies.css";
import Logo from '../assets/logo.png';
import axios from "axios";

import "react-circular-progressbar/dist/styles.css";



class Movies extends Component {
   constructor(props) {
      super(props);
      this.state = {
         key: "fd17834fbad9e4168715ef1a542d7bce",
         search: "",
         movies: [],
         nav: false
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

   nav = (e) => {
      let nav = document.querySelector(".nav-menu");
      if (this.state.nav) {
         nav.classList.remove("menu-on");
      } else {
         nav.classList.add("menu-on");
      }
      this.setState({ nav: !this.state.nav });
   }

   render() {
      const { movies, nav } = this.state;
      return (
         <div className="main-container">
            {/* Navigation Menu */}
            <NavMenu />
            {/* Static Nav Bar */}
            <div className="bar" >
               <div className="nav">
                  <img className="logo" src={Logo} alt="logo" />
                  <h1 className="logo-header">MOVIESDB STREAM</h1>
                  {!nav ?
                     <Menu color="white" size={30} className="menu-icon" onClick={this.nav} />
                     : <X color="white" size={30} className="menu-icon" onClick={this.nav} />
                  }

               </div>
               {/* Search Input */}
               <Search search={this.search} query={this.state.search}
                  dismiss={this.dismissKeyboard}
               />
            </div>
            {/* List of Buttons to get movies */}
            <div className="links-list">
               <button className="get-btn get-btn-on" onClick={this.getMovies}>TRENDING
                         </button>
               <button onClick={this.getMovies} className="get-btn">UPCOMING</button>
               <button onClick={this.getMovies} className="get-btn">TOP</button>
            </div>
            {/* Movies Array Container */}
            <div className="movies-container">
               {movies ? movies.map((movie, i) =>
                  <Movie movie={movie} key={i} />
               ) : null}
            </div>
         </div>
      )
   }
}


export default Movies;