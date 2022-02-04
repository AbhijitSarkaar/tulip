import { useState, useEffect } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import movies from "./data.json";
import api from "./api.json";
import "./App.css";
const IPFS = require("ipfs");

const CONTRACT_ADDRESS = "0x0Abbcdd04fBf5FbCA8Df150B641598d136a894F4";
const abi = api.abi;

function App() {
    const [currentAccount, setCurrentAccount] = useState("");
    const [data, setData] = useState([]);
    let node;

    useEffect(() => {
        checkIfWalletConnected();
        setUpEvents();
    }, []);

    const setUpEvents = async () => {
        window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                setData(movies.data);
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
                setData(movies.data);
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

    const handleClick = async () => {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
            const txn = await contract.createTicketNFT(
                "https://jsonkeeper.com/b/3NAA"
            );
            console.log("transaction", txn);
        }
    };

    const storeData = async () => {
        if (!node) {
            console.log("creating an ipfs instance");
            node = await IPFS.create();
        }
        const filedata = JSON.stringify({
            name: "Tulip NFT",
            description: "nice location for having a beer",
            image: "https://i.imgur.com/jUe6Eyl.jpeg",
        });
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
                <div key={movie.id}>{movie.name}</div>
            ))}
            <br />
            {currentAccount ? (
                <button onClick={handleClick}>Create NFT</button>
            ) : (
                ""
            )}
            {<button onClick={storeData}>Store</button>}
        </div>
    );
}

export default App;
