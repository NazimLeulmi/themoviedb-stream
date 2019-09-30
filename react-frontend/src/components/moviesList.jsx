import React from 'react';
import styled from 'styled-components';
import Movie from './movie';
import NavMenu from './nav';
import { clr } from "./authForm";

const MoviesContainer = styled.div`
  position:relative;
  /* max-width:2000px; */
  min-height:100vh;
  padding-top:100px;
  background:rgba(${clr.darkblue});
  display:flex;
  flex-direction:column;
  align-items:center;
  background:(255,255,255,.45);
  @media(min-width:700px){
    display:grid;
    grid-template-columns:1fr 1fr;
    justify-items:center;
    padding-right:10px;
    padding-left:10px;
  }
  @media(min-width:1150px){
    grid-template-columns:1fr 1fr 1fr;
  }
  @media(min-width:1500px){
    grid-template-columns:450px 450px 450px;
    justify-content:center;
  }
`;

const MoviesList = ({ movies }) => (
  <MoviesContainer>
    <NavMenu />
    {movies && movies.map((movie, i) => {
      return <Movie movie={movie} key={movie.title} />
    })}
  </MoviesContainer>
)


export default MoviesList;