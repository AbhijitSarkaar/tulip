import styled from "styled-components";

const Connect = () => {
    return (
        <ConnectContainer>
            <Header>
                <Brand>Tulip</Brand>
                <Button>Connect Wallet</Button>
            </Header>
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
