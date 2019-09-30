import React from "react";
import {
  CircularProgressbar, buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { clr } from "./authForm";
import isSupported from "../functions/isSupported";




//{movie.title}
//{movie.release_date}

const MovieContainer = styled.div`
  width:95%;
  max-height:278px;
  position:relative;
  border:1px solid gray;
  border-radius:3px;
  margin:10px;
  cursor:pointer;
  margin-bottom:5px;
  display:grid;
  grid-template-columns:40% 1fr;
  @media(min-width:700px){
    height:278px;
    grid-template-columns:185px 1fr;
  }
`;

const MoviePoster = styled.img`
  border-right:1px solid gray;
  /* max-width:185px; */
  width:100%;
  height:100%;
  max-height:278px;
  flex:1;
`;

const Info = styled.div`
  position:relative;
  /* padding:5px; */
  background:rgba(255,182,193,.25);
  flex:1;
`;
const Rating = styled(CircularProgressbar)`
  background:red;
  position:absolute;
  height:100%;
`;

const Title = styled.h1`
  font-family:Ubuntu Bold;
  font-size:18px;
  color:rgb(${clr.sky});
  line-height:22px;
  margin:5px;
`;

const Overview = styled.p`
  font-size:14px;
  font-family:Ubuntu;
  color:rgb(${clr.lightgray});
  line-height:20px;
  margin:5px;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height:${isSupported() ? "auto" : "140px"};
`;

const Date = styled.p`
  font-size:14px;
  width:100%;
  height:50px;
  color:rgb(${clr.lblue});
  position:absolute;
  bottom:0;
  display:flex;
`

const Btn = styled.button`
  width:100px;
  height:30px;
  border: 1px solid rgb(${clr.lblue});
  color: rgb(${clr.lightgray});
  border-radius:4px;
  background:transparent;
  cursor:pointer;
  position:absolute;
  bottom:10px;
  right:10px;
`

const Movie = ({ movie }) => (
  <MovieContainer>
    <MoviePoster alt="movie-poster" src={`https://image.tmdb.org/t/p/w185${
      movie.poster_path || movie.backdrop_path}`}
    />
    <Info>

      <Title>{movie.title}</Title>
      <Overview>
        {movie.overview}
      </Overview>

      <Date>
        {movie.release_date}
        <Rating
          value={movie.vote_average * 10}
          text={`${movie.vote_average * 10}%`}
          styles={buildStyles({
            textColor: "white",
            pathColor: `rgb(${clr.lblue})`,
            trailColor: "gray",
            textSize: 20,
          })}
        />
      </Date>
    </Info>
  </MovieContainer>
)




export default Movie;
