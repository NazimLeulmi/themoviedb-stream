import React, { Component } from "react";
import { Menu, X } from "react-feather";
import Search from "./components/search";
import Movie from "./components/movie";
import NavMenu from "./components/nav";
import "../assets/movies.css";
import "../assets/spinner.css";
import Logo from '../assets/logo.png';
import axios from "axios";

import "react-circular-progressbar/dist/styles.css";



class Movies extends Component {
   constructor(props) {
      super(props);
      this.state = {
         key: "fd17834fbad9e4168715ef1a542d7bce",
         now: "TRENDING",
         loading: false,
         page: 1,
         pages: 1,
         search: "",
         movies: [],
         nav: false,
         height: window.innerHeight,
      }
   }

   componentDidMount = () => {
      this.setState({ loading: true }, this.fetchMovies);
      window.addEventListener("scroll", this.handleScroll);
   }

   // Get Trending Movies
   fetchMovies = () => {
      const { key, page, now } = this.state;
      // url to get the trending movies from the public api
      let link = "";
      if (now === "TRENDING") {
         link = `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}&page=${page}`;
      } else {
         let word = "";
         if (now === "TOP RATED") {
            word = "top_rated";
         } else if (now === "POPULAR") {
            word = "popular";
         }
         link = `https://api.themoviedb.org/3/movie/${word}?api_key=${key}&language=en-US&page=${page}`
      }
      // actual get request to fetch the movies
      axios.get(link)
         .then(response => {
            const { results, page, total_pages } = response.data;
            console.log(response.data);
            this.setState({
               movies: this.state.movies.concat(results),
               page: page,
               pages: total_pages,
            });
         })
         .catch(error => {
            // handle error
            console.log(error);
         })
   }

   getMovies = (e) => {
      const btn = document.querySelector(".get-btn-on");
      btn.classList.remove("get-btn-on");
      const clicked = document.querySelector(`.get-btn[name=${e.target.name}]`);
      clicked.classList.add("get-btn-on");
      this.setState({ now: e.target.textContent, loading: "true", movies: [] },
         this.fetchMovies
      );
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


   getMore = () => {
      console.log("getting more data")
      console.log("you reached the bottom");
      this.setState({ page: this.state.page + 1, loading: true }, this.fetchMovies);
   };

   handleScroll = () => {
      console.log("handling scroll");
      const windowHeight = "innerHeight" in window ? window.innerHeight :
         document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight,
         html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = Math.round(windowHeight + window.pageYOffset);
      if (windowBottom >= docHeight) {
         this.getMore();
      }
   }


   render() {
      const { movies, nav, loading } = this.state;
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
               <button name="TRENDING" className="get-btn get-btn-on"
                  onClick={this.getMovies}>TRENDING
               </button>
               <button name="TOP" onClick={this.getMovies} className="get-btn">
                  TOP RATED
               </button>
               <button name="POPULAR" onClick={this.getMovies} className="get-btn">
                  POPULAR
               </button>
            </div>
            {/* Movies Array Container */}
            <div className="movies-container">
               {movies ? movies.map((movie, i) =>
                  <Movie movie={movie} key={i} />
               ) : null}
            </div>
            {loading ? <div className="loader" /> : null}
         </div>
      )
   }
}


export default Movies;