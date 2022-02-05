import { useState, useEffect } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { API_KEY, CONTRACT_ADDRESS, CID } from "./keys";
import api from "./api.json";
import "./App.css";
const IPFS = require("ipfs");

const abi = api.abi;

function App() {
    const [currentAccount, setCurrentAccount] = useState("");
    const [data, setData] = useState([]);
    const [movie, setMovie] = useState({});
    let node;

    useEffect(() => {
        checkIfWalletConnected();
        setUpEvents();
        getMoviesData();
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

        const NFTData = (await Promise.all(promises).then((res) => res))
            .map((res) => res.data.items[0].nft_data)
            .filter(
                (res) =>
                    String(res[0].owner_address) ===
                    "0x8fe4f57d683db74ce35fcad5e1ecfb8c45c2e18d"
            )
            .map((res) => res[0].external_data);
        console.log("NFTData", NFTData);
    };

    const getMoviesData = async () => {
        const response = await fetch(`https://ipfs.io/ipfs/${CID}`);
        const json = await response.json();
        setData(json);
    };

    const setUpEvents = async () => {
        window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                setCurrentAccount("");
                setData([]);
            }
        });
    };

    const checkIfWalletConnected = async () => {
        const provider = await detectEthereumProvider();
        const { ethereum } = window;
        if (provider) {
            const accounts = await ethereum.request({
                method: "eth_accounts",
            });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            }
        }
    };

    const handleLogIn = async () => {
        const { ethereum } = window;
        if (ethereum) {
            await ethereum.request({
                method: "eth_requestAccounts",
            });
        }
    };

    const storeData = async () => {
        if (!node) {
            console.log("creating an ipfs instance");
            node = await IPFS.create();
        }
        const filedata = JSON.stringify(movie);
        console.log(node);
        const ipfsData = await node.add(filedata);
        const path = `https://ipfs.io/ipfs/${ipfsData.path}`;
        console.log(path);

        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
            console.log("creating nft..");
            const txn = await contract.createTicketNFT(path);
            console.log("nft created");
            console.log("transaction", txn);
        }
    };
    return (
        <div className="App">
            {currentAccount.length ? (
                ""
            ) : (
                <button onClick={handleLogIn}>Connect wallet</button>
            )}
            {currentAccount ? <div>wallet conected {currentAccount}</div> : ""}
            <br />
            {data.map((movie) => (
                <div key={movie.id}>
                    <div onClick={() => setMovie(movie)}>{movie.name}</div>
                    <div>{movie.imdbRating}</div>
                    <div>{movie.price}</div>
                </div>
            ))}
            <br />
            {<button onClick={storeData}>Store</button>}
        </div>
    );
}

export default App;
