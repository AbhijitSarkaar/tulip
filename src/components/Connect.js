import { useState, useEffect } from "react";
import styled from "styled-components";
import { globalState, initialState } from "./globalContext";
import detectEthereumProvider from "@metamask/detect-provider";
import { CID } from "../keys";
import { Outlet, useNavigate } from "react-router";

const Connect = () => {
    const [context, setContext] = useState(initialState);
    const navigate = useNavigate();

    useEffect(() => {
        getMoviesData();
        setUpEvents();
    }, []);

    const setUpEvents = async () => {
        window.ethereum.on("accountsChanged", (accounts) => {
            let address;
            if (accounts.length) {
                console.log("Connect accountsChanged login");
                address = {
                    value: accounts[0],
                };
            } else {
                address = {
                    value: "",
                };
                navigate("/");
            }

            setContext((prevState) => ({
                ...prevState,
                address,
            }));
        });
    };

    const getMoviesData = async () => {
        const response = await fetch(`https://ipfs.io/ipfs/${CID}`);
        const json = await response.json();
        const data = json.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
        }, {});
        const contextData = {
            list: json,
            data,
        };
        const provider = await detectEthereumProvider();
        const { ethereum } = window;
        if (provider) {
            const accounts = await ethereum.request({
                method: "eth_accounts",
            });
            if (accounts.length) {
                console.log("authorized accounts found", accounts);
                contextData.address = {
                    value: accounts[0],
                };
            } else {
                contextData.address = {
                    value: "",
                };
            }
        }
        setContext(contextData);
    };

    const handleClick = async () => {
        let newContext = context;
        if (context.address.value) {
            navigate("/my-nfts");
        } else {
            const { ethereum } = window;
            if (ethereum) {
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                if (accounts.length) {
                    console.log("logged in with account: ", accounts);
                    newContext.address.value = accounts[0];
                }
            }
        }
        setContext(newContext);
    };

    console.log("context", context);
    console.log(
        "context",
        context.address.value ? "My Tickets" : "Connect Wallet"
    );
    return (
        <ConnectContainer>
            <Header>
                <Brand onClick={() => navigate("/")}>Tulip</Brand>
                {context.address &&
                    (context.address.value ? (
                        <Button onClick={handleClick}>My Tickets </Button>
                    ) : (
                        <Button onClick={handleClick}>Connect Wallet</Button>
                    ))}
            </Header>
            <globalState.Provider value={context}>
                <div style={{ padding: "20px" }}>
                    <Outlet />
                </div>
            </globalState.Provider>
        </ConnectContainer>
    );
};

const ConnectContainer = styled.div``;
const Header = styled.div`
    height: 4rem;
    display: flex;
    border-bottom: 1px solid lightgray;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
    box-shadow: 0 3px 3px lightgray;
`;
const Brand = styled.div`
    font-size: 30px;
    font-weight: bolder;
    margin-left: 80px;
    font-family: verdana;
    cursor: pointer;
`;
const Button = styled.div`
    height: 40px;
    background: blue;
    color: white;
    display: flex;
    width: max-content;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 5px;
`;

export default Connect;
