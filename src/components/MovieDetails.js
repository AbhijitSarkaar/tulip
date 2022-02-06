import { useParams } from "react-router";
import styled from "styled-components";

const MovieDetails = () => {
    const { id } = useParams();

    return (
        <MovieDetailsContainer>
            <Details>
                <PosterContainer>
                    <Image
                        src={
                            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SY500_CR0,0,337,500_AL_.jpg"
                        }
                    ></Image>
                </PosterContainer>
                <Action>
                    <MovieName>Black Panther</MovieName>
                    <Description>
                        After the events of Captain America: Civil War, King
                        T'Challa returns home to the reclusive, technologically
                        advanced African nation of Wakanda to serve as his
                        country's new leader. However, T'Challa soon finds that
                        he is challenged for the throne from factions within his
                        own country. When two foes conspire to destroy Wakanda,
                        the hero known as Black Panther must team up with C.I.A.
                        agent Everett K. Ross and members of the Dora Milaje,
                        Wakandan special forces, to prevent Wakanda from being
                        dragged into a world war.
                    </Description>
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
    grid-template-columns: 2fr 2fr;
    gap: 100px;
    box-sizing: border-box;
`;
const PosterContainer = styled.div`
    padding-left: 100px;
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
