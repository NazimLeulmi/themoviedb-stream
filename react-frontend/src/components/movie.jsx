import React from "react";
import {
   CircularProgressbar, buildStyles
} from "react-circular-progressbar";
import NoImage from '../assets/imagenf.png';
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { clr } from "./authForm";
import Dotdotdot from 'react-dotdotdot'
// import { Star } from "react-feather";



//{movie.title}
//{movie.release_date}

const MovieContainer = styled.div`
   position:relative;
   border:1px solid gray;
   border-radius:3px;
   min-width:320px;
   min-width:1px;
   display:flex;
   margin:15px;
   cursor:pointer;
`;

const MoviePoster = styled.img`
   width:225px;
   border-right:1px solid gray;
   /* flex:1; */
`;

const Info = styled.div`
   display:flex;
   flex-direction:column;
   flex:1;
   padding:10px;
`;
const Rating = styled(CircularProgressbar)`
`;

const Title = styled.h1`
   font-family:Saira;
   font-size:22px;
   color:rgb(${clr.sky});
   width:90%;
   line-height:22px;
   margin-left:5px;
`;

const Overview = styled.p`
   font-size:16px;
   color:rgb(${clr.lightgray});
   width:90%;
   height:200px;
   background:blue;
   line-height:20px;
   margin:5px;
   overflow: hidden;
`;
const Movie = (props) => {
   const { movie } = props;
   return (
      <MovieContainer>
         <MoviePoster alt=""
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path ||
               movie.backdrop_path}` || NoImage}
         />

         <Info>
            <Title>{movie.title}</Title>
            <Dotdotdot clamp={4}>
               <Overview>
                  {movie.overview}
               </Overview>
            </Dotdotdot>
            {/* <Rating
               value={movie.vote_average * 10}
               text={`${movie.vote_average * 10}%`}
               className="rating-circle"
               styles={buildStyles({
                  textColor: `rgb(${clr.lblue})`,
                  pathColor: `rgb(${clr.lblue})`,
                  trailColor: "gray",
                  textSize: 24,
               })}
            /> */}
         </Info>
      </MovieContainer>
   )
}




export default Movie;