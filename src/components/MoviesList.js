import styled from "styled-components";
import Movie from "./Movie";

const MoviesList = (props) => {
    return (
        <MoviesListContainer>
            {props.movies.map((movie) => (
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
