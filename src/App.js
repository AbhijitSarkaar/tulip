import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import "./App.css";

function App() {
    const [currentAccount, setCurrentAccount] = useState("");

    useEffect(() => {
        checkIfWalletConnected();
        setUpEvents();
    }, []);

    const setUpEvents = async () => {
        window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else setCurrentAccount("");
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
        if (!currentAccount && window.ethereum) {
            await ethereum.request({
                method: "eth_requestAccounts",
            });
        } else {
            setCurrentAccount("");
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
        </div>
    );
}

export default App;
