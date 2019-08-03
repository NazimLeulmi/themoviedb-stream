import Fav from '../../assets/like.png';
import React from "react";
import {
   CircularProgressbar, buildStyles
} from "react-circular-progressbar";
import NoImage from '../../assets/imagenf.png';

const Movie = (props) => {
   const { movie } = props;
   return (
      <div className="movie">
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
            <img className="favourite"
               src={Fav} name="like"
               alt="favourite" title="add to favourites" />
         </div>
      </div>
   )
}




export default Movie;