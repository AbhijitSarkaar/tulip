import { Link } from "react-router-dom";
import styled from "styled-components";

const Movie = (props) => {
    const { id, name, image, imdbRating } = props.movie;
    return (
        <MovieContainer>
            <ImageContainer>
                <Image src={image} alt={name} />
            </ImageContainer>
            <Footer>
                <Rating>
                    <RatingText>Rating</RatingText>
                    <RatingValue>{imdbRating || 8}</RatingValue>
                </Rating>
                <Button>
                    <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={`/details/${id}`}
                    >
                        {"Book Now"}
                    </Link>
                </Button>
            </Footer>
        </MovieContainer>
    );
};

const MovieContainer = styled.div`
    height: 450px;
    display: grid;
    grid-template-rows: 85% 15%;
    box-sizing: border-box;
`;
const ImageContainer = styled.div``;
const Image = styled.img`
    height: 100%;
    width: 100%;
`;
const Footer = styled.div`
    display: flex;
    border: 1px solid black;
    box-sizing: border-box;
    border: 1px solid cyan;
`;
const Rating = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid cyan;
`;
const RatingText = styled.div`
    height: 50%;
    font-size: 20px;
    display: flex;
    align-items: flex-end;
    color: white;
`;
const RatingValue = styled.div`
    height: 50%;
    font-size: 20px;
    font-weight: bolder;
    display: flex;
    align-items: center;
    color: white;
`;

const Button = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Movie;
