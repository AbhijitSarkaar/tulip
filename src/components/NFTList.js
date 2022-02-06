import { useEffect, useState } from "react";
import NFT from "./NFT";
import { API_KEY } from "../keys";
import styled from "styled-components";

const NFTList = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        getNFTMetadata();
    }, []);

    const getNFTMetadata = async () => {
        const res1 = await fetch(
            `https://api.covalenthq.com/v1/80001/tokens/0x0Abbcdd04fBf5FbCA8Df150B641598d136a894F4/nft_token_ids/?quote-currency=USD&format=JSON&page-size=10000&key=${API_KEY}`
        );
        const data1 = await res1.json();
        const tokenIds = data1.data.items.map((item) => item.token_id);
        console.log("tokenIds", tokenIds);

        const promises = tokenIds.map((id) => {
            return fetch(
                `https://api.covalenthq.com/v1/80001/tokens/0x0Abbcdd04fBf5FbCA8Df150B641598d136a894F4/nft_metadata/${id}/?key=${API_KEY}`
            ).then((res) => res.json());
        });
        let data = [];
        const NFTData = (await Promise.all(promises).then((res) => res))
            .map((res) => {
                data.push(res.data.items[0]);
                const item = res.data.items[0];
                item.nft_data[0].external_data.token_id =
                    item.nft_data[0].token_id;
                item.nft_data[0].external_data.contract_address =
                    item.contract_address;
                return item.nft_data;
            })
            .filter(
                (res) =>
                    String(res[0].owner_address) ===
                    "0x8fe4f57d683db74ce35fcad5e1ecfb8c45c2e18d"
            )
            .map((res) => {
                return res[0].external_data;
            });
        console.log("NFTData", NFTData);
        console.log("data", data);
        setTickets(NFTData);
    };

    return (
        <MoviesListContainer>
            {tickets.map((ticket) => (
                <NFT key={ticket.image} ticket={ticket}></NFT>
            ))}
        </MoviesListContainer>
    );
};

const MoviesListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
`;

export default NFTList;
