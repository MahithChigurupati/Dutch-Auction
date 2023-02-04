//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

contract uniqueNFT is ERC721{

    uint public totalSupply;
    uint public maxSupply;

    constructor(uint max) ERC721("UNIQ NFT", "UN"){
        maxSupply = max;
    }

    function safeMint(address to) public{
        require(maxSupply > totalSupply,"already minted max");
        uint tokenID = totalSupply;
        totalSupply++;
        _mint(to,tokenID);
    }

}