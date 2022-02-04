// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TicketNFT is ERC721URIStorage {
    constructor() ERC721 ('TulipNFT', 'TLP') {}

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    function createTicketNFT(string memory data_url) public {
        uint id = _tokenIds.current();
        _safeMint(msg.sender, id);
        _setTokenURI(id, data_url);
        _tokenIds.increment();
    }

}