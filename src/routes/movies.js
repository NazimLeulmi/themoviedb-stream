import React, { Component } from "react";
import { ShoppingCart, Search } from "react-feather";
import * as  s from "../assets/movies.css";
import Logo from '../assets/logo.png';


class Movies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ""
        }
    }
    getMovies(e) {
        console.log(e.target.className);
        console.log("clicked");
    }

    search(e) {
        console.log("typing");
    }

    render() {
        return (
            <React.Fragment>
                <div id={s.bar}>
                    <div id={s.nav}>
                        <image id={s.logo} src={Logo} />
                        <h1 id={s.header}>STORE</h1>
                        <ShoppingCart color="white" size={30} id="" />
                    </div>
                    <input id={s.search} type="text" name="search"
                        value={this.state.search}
                        placeholder="search for a movie"
                        onChange={this.search.bind(this)}
                    />
                    <Search color="white" size={20} id={s.search} />
                </div>
                <div id="movies-container">
                    <div id="links-list">
                        <button className="get-btn get-btn-on" onClick={this.getMovies.bind(this)}>POPULAR
                         </button>
                        <button onClick={this.getMovies.bind(this)} className="get-btn">UPCOMING</button>
                        <button onClick={this.getMovies.bind(this)} className="get-btn">TOP</button>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}


export default Movies;