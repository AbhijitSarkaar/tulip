import styled from "styled-components";
import Movie from "./Movie";
import { globalState } from "./globalContext";
import { useContext } from "react";

const MoviesList = () => {
    const state = useContext(globalState);
    return (
        <MoviesListContainer>
            {state.list.map((movie) => (
                <Movie key={movie.id} movie={movie}></Movie>
            ))}
        </MoviesListContainer>
    );
};

const MoviesListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
`;

export default MoviesList;
