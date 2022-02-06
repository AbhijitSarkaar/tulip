import { useState, useContext } from "react";
import { ethers } from "ethers";
import { useNavigate, useParams } from "react-router";
import detectEthereumProvider from "@metamask/detect-provider";
import api from "../api.json";
import styled from "styled-components";
import { globalState } from "./globalContext";

const IPFS = require("ipfs");

const MovieDetails = () => {
    const { data, address } = useContext(globalState);
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const movie = data[id];
    let node;
    const createNFT = async () => {
        setLoading(true);
        if (!node) {
            node = await IPFS.create();
        }
        const filedata = JSON.stringify(movie);
        const ipfsData = await node.add(filedata);
        const path = `https://ipfs.io/ipfs/${ipfsData.path}`;
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                "0x0Abbcdd04fBf5FbCA8Df150B641598d136a894F4",
                api.abi,
                signer
            );
            await contract.createTicketNFT(path);
            setLoading(false);
            navigate("/");
        }
    };

    const handleClick = async () => {
        if (!address.value) {
            const provider = await detectEthereumProvider();
            const { ethereum } = window;
            if (provider) {
                await ethereum.request({
                    method: "eth_requestAccounts",
                });
            }
        } else {
            createNFT();
        }
    };

    return (
        <MovieDetailsContainer>
            <Details>
                <PosterContainer>
                    <Image src={movie?.image}></Image>
                </PosterContainer>
                <Action>
                    <MovieName>{movie?.name}</MovieName>
                    <Description>{movie?.description}</Description>
                    <Button onClick={handleClick}>
                        {loading ? (
                            <Loader />
                        ) : address.value ? (
                            "Book Ticket"
                        ) : (
                            "Connect Wallet"
                        )}
                    </Button>
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
    grid-template-rows: 10% 80% 10%;
    padding-right: 20px;
    color: white;
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
    background: cyan;
    color: black;
    font-weight: bold;
`;
const Loader = styled.div`
    border: 4px solid white;
    border-radius: 50%;
    border-top: 4px solid red;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export default MovieDetails;
