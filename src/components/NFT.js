import { useState } from "react";
import styled from "styled-components";

const NFT = (props) => {
    const { contract_address, token_id, name, image } = props.ticket;
    const [imageHover, setImageHover] = useState(false);

    const handleClick = () => {
        window.open(
            `https://testnets.opensea.io/assets/mumbai/${contract_address}/${token_id}`
        );
    };

    return (
        <NFTContainer>
            <ImageContainer
                onMouseEnter={() => setImageHover(true)}
                onMouseLeave={() => setImageHover(false)}
            >
                <Image src={image} alt={name} />
                {imageHover && (
                    <LinkContainer onClick={handleClick}>
                        Check on opensea
                    </LinkContainer>
                )}
            </ImageContainer>
        </NFTContainer>
    );
};

const NFTContainer = styled.div`
    height: 450px;
    display: grid;
    grid-template-rows: 85% 15%;
    box-sizing: border-box;
`;
const ImageContainer = styled.div`
    position: relative;
`;
const LinkContainer = styled.div`
    cursor: pointer;
    height: 100%;
    width: 100%;
    background: linear-gradient(
        rgb(0.1, 0.1, 0.1, 0.1),
        rgb(0.1, 0.1, 0.1, 0.6)
    );
    position: absolute;
    bottom: 0;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-sizing: border-box;
`;
const Image = styled.img`
    height: 100%;
    width: 100%;
`;
export default NFT;
