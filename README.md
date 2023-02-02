# Dutch-Auction

A project to build a decentralized application for a Dutch Auction

This is a Repo for series of multiple versional improvements of Dutch Auction Project being done as part of INFO 7500: Cryptocurrency and Smart Contract Engineering Class @Northeastern University under Prof. Suhabe Bugrara

<Strong>Devoloper</Strong> - SaiMahith Chigurupati <br>
<Strong>NUID</Strong> - 002700539

## Instructions to run the Project

````
//install the dependancies
npm i --save

//compile the project
npm hardhat compile

//test the project
npm hardhat test

//generating coverage reports
npm hardhat coverage

````

## Version 1.0

- Create a new contract called BasicDutchAuction.sol that implements a Dutch auction called as described below.
- Write test cases to thoroughly test your contracts. Generate a Solidity coverage report and commit it to your repository.
- The BasicDutchAuction.sol contract works as follows:

1. The seller instantiates a DutchAuction contract to manage the auction of a single, physical item at a single auction event. The contract is initialized with the following parameters:
     - <Strong>reservePrice:</Strong> the minimum amount of wei that the seller is willing to accept for the item
     - <Strong>numBlocksAuctionOpen:</Strong> the number of blockchain blocks that the auction is open for
     - <Strong>offerPriceDecrement:</Strong> the amount of wei that the auction price should decrease by during each subsequent block. 
2. The seller is the owner of the contract.
3. The auction begins at the block in which the contract is created.
4. The initial price of the item is derived from reservePrice, numBlocksAuctionOpen, and  offerPriceDecrement: initialPrice = reservePrice + numBlocksAuctionOpen*offerPriceDecrement
5. A bid can be submitted by any Ethereum externally-owned account.
6. The first bid processed by the contract that sends wei greater than or equal to the current price is the  winner. The wei should be transferred immediately to the seller and the contract should not accept  any more bids. All bids besides the winning bid should be refunded immediately.