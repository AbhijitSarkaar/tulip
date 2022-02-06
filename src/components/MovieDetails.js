import { useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { globalState } from "./globalContext";

const MovieDetails = () => {
    const { data } = useContext(globalState);
    const { id } = useParams();
    const movie = data[id];

    return (
        <MovieDetailsContainer>
            <Details>
                <PosterContainer>
                    <Image src={movie?.image}></Image>
                </PosterContainer>
                <Action>
                    <MovieName>{movie?.name}</MovieName>
                    <Description>{movie?.description}</Description>
                    <Button>Book Ticket</Button>
                </Action>
            </Details>
        </MovieDetailsContainer>
    );
};

const MovieDetailsContainer = styled.div``;
const Details = styled.div`
    height: 500px;
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 100px;
    box-sizing: border-box;
`;
const PosterContainer = styled.div`
    padding-left: 120px;
`;
const Image = styled.img`
    width: 500px;
    height: 500px;
`;
const Action = styled.div`
    display: grid;
    grid-template-rows: 1fr 10fr 1fr;
    padding-right: 20px;
`;
const MovieName = styled.div`
    font-size: 40px;
    display: flex;
    line-height: 1;
`;
const Description = styled.div`
    font-size: 18px;
    margin-top: 20px;
`;
const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    background: #065b70;
    color: white;
    font-weight: bold;
`;

export default MovieDetails;
