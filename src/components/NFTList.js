import { useEffect, useState, useContext } from "react";
import NFT from "./NFT";
import { globalState } from "./globalContext";
import styled from "styled-components";
import { useNavigate } from "react-router";

const NFTList = () => {
    const { address } = useContext(globalState);
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        if (!address || !address.value) {
            navigate("/");
        } else getNFTMetadata();
    }, []);

    const getNFTMetadata = async () => {
        const res1 = await fetch(
            `https://api.covalenthq.com/v1/80001/tokens/0x0Abbcdd04fBf5FbCA8Df150B641598d136a894F4/nft_token_ids/?quote-currency=USD&format=JSON&page-size=10000&key=ckey_b87e296d1faa48d983b7685409d`
        );
        const data1 = await res1.json();
        const tokenIds = data1.data.items.map((item) => item.token_id);

        const promises = tokenIds.map((id) => {
            return fetch(
                `https://api.covalenthq.com/v1/80001/tokens/0x0Abbcdd04fBf5FbCA8Df150B641598d136a894F4/nft_metadata/${id}/?key=ckey_b87e296d1faa48d983b7685409d`
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
            .filter((res) => String(res[0].owner_address) === address.value)
            .map((res) => {
                return res[0].external_data;
            });
        setTickets(NFTData);
    };

    return tickets.length > 0 ? (
        <NFTListContainer>
            {tickets.map((ticket) => (
                <NFT key={ticket.image} ticket={ticket}></NFT>
            ))}
        </NFTListContainer>
    ) : (
        <LoaderContainer>
            <Loader />
        </LoaderContainer>
    );
};

const NFTListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
`;

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 600px;
    align-items: center;
`;

const Loader = styled.div`
    border: 8px solid white;
    border-radius: 50%;
    border-top: 8px solid cyan;
    width: 200px;
    height: 200px;
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export default NFTList;
