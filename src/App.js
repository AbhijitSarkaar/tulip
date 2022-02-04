import { useState, useEffect } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { create } from "ipfs-http-client";
import movies from "./data.json";
import api from "../artifacts/contracts/TicketNFT.sol/TicketNFT.json";
import "./App.css";

require("dotenv").config();

const client = create("https://ipfs.infura.io:5001/api/v0");
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const abi = api.abi;

function App() {
    const [currentAccount, setCurrentAccount] = useState("");
    const [data, setData] = useState([]);

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
        const filedata = JSON.stringify({
            name: "Tulip NFT",
            description: "NFT Minted on booking from web app",
            image: "https://i.imgur.com/p22qfrC.jpeg",
        });
        const ipfsData = await client.add(filedata);
        console.log("endpoint", ipfsData.path);
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
