//SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UniqToken is Ownable, ERC20("UniqToken","UT"){

    uint256 public maxSupply;

    constructor(uint max){
        maxSupply = max;

    }

    function mint(address to, uint256 amount) public onlyOwner{

        require(amount < maxSupply - totalSupply(), "Limit exceeded");
        _mint(to, amount );

    }

}