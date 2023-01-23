// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//Create a new contract called BasicDutchAuction.sol that implements a Dutch auction called as described below.
//Write test cases to thoroughly test your contracts. Generate a Solidity coverage report and commit it to your repository.

//The BasicDutchAuction.sol contract works as follows:
//  1. The seller instantiates a DutchAuction contract to manage the auction of a single, physical item at a single auction event. The contract is initialized with the following parameters:
//      a. reservePrice: the minimum amount of wei that the seller is willing to accept for the item
//      b. numBlocksAuctionOpen: the number of blockchain blocks that the auction is open for
//      c.offerPriceDecrement: the amount of wei that the auction price should decrease by during each subsequent block.
//  2.The seller is the owner of the contract.
//  3. The auction begins at the block in which the contract is created.
//  4. The initial price of the item is derived from reservePrice, numBlocksAuctionOpen, and  offerPriceDecrement: initialPrice = reservePrice + numBlocksAuctionOpen*offerPriceDecrement
//  5. A bid can be submitted by any Ethereum externally-owned account.
//  6. The first bid processed by the contract that sends wei greater than or equal to the current price is the  winner. The wei should be transferred immediately to the seller and the contract should not accept  any more bids. All bids besides the winning bid should be refunded immediately.

contract BasicDutchAuction {
    uint256 public reservePrice;
    uint256 private numBlocksAuctionOpen;
    uint256 private offerPriceDecrement;

    constructor(){
        //address seller = msg.sender;
        //address owner = seller;
    }

    function bid() public pure returns(bool){
        //
        return true;
    }
}
