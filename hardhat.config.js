require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
    solidity: "0.8.4",
    networks: {
        polygon_testnet: {
            url: process.env.ALCHEMY_URL,
            accounts: [process.env.KEY],
        },
    },
};
