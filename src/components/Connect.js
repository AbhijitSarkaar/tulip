import { useState, useEffect } from "react";
import styled from "styled-components";
import { globalState, initialState } from "./globalContext";
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
        const response = await fetch(
            `https://ipfs.io/ipfs/QmSZpPMUu1zmuCBscohbBk33u2FiouGNFxpAbKRBFS6Zi4`
        );
        const json = await response.json();
        const data = json.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
        }, {});
        const contextData = {
            list: json,
            data,
        };
        const { ethereum } = window;
        if (ethereum) {
            const accounts = await ethereum.request({
                method: "eth_accounts",
            });
            if (accounts.length) {
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
                    newContext.address.value = accounts[0];
                }
            }
        }
        setContext(newContext);
    };
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
            {context.list.length > 0 ? (
                <globalState.Provider value={context}>
                    <div style={{ padding: "20px" }}>
                        <Outlet />
                    </div>
                </globalState.Provider>
            ) : (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            )}
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
    border-bottom: 0.1px solid white;
`;
const Brand = styled.div`
    font-size: 30px;
    font-weight: bolder;
    margin-left: 80px;
    font-family: verdana;
    cursor: pointer;
    color: cyan;
`;
const Button = styled.div`
    height: 40px;
    background: cyan;
    color: black;
    display: flex;
    width: max-content;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
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
export default Connect;
