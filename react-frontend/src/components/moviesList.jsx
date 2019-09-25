import React from 'react';
import styled from 'styled-components';
import Movie from './movie';
import NavMenu from './nav';
import { clr } from "./authForm";

const MoviesContainer = styled.div`
  position:relative;
  min-height:100vh;
  width:100vw;
  max-width:2000px;
  padding-top:100px;
  display:grid;
  grid-template-columns: repeat(auto-fit,minmax(450px,1fr));
  grid-gap:20px;
  background:rgba(${clr.darkblue});
  padding-bottom:10px; 
  @media(min-width:800px) {
    padding-left:85px;
    padding-right:85px;
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