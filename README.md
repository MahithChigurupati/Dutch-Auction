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
npx hardhat compile

//test the project
npx hardhat test

//generating coverage reports
npx hardhat coverage

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
<br> <br>

## Version 2.0

- Create a new directory in your Github repo called v2.0 and initialize a new hardhat project.
- Copy over any files you can reuse from the previous versions of this project into the directory for this version.
- Understand how the ERC721 contract works by downloading an off-the-shelf version from OpenZeppellin, and write test cases so you understand how to create NFT contracts, how to mint NFTs, and how to transfer them. ERC721 is the official name for Ethereum’s NFT contract specification.
- To add contracts from OpenZeppellin into your project, definitely use npm to download them. The OpenZeppellin contracts have a lot of dependencies, and thus copying and pasting them will 
     1. take a lot of time, 
     2. will make it hard to upgrade to newer versions, 
     3. increase the vulnerability scope of your project, and 4) make it more likely for those contracts to get changed by you or your team.
- Create a new contract called NFTDutchAuction.sol. It should have the same functionality as BasicDutchAuction.sol but it sells an NFT instead of a physical item. The constructor for the NFTDutchAuction.sol should be: constructor(address erc721TokenAddress, uint256 _nftTokenId, uint256 _reservePrice, uint256 _numBlocksAuctionOpen, uint256 _offerPriceDecrement)
- Write test cases to thoroughly test your contracts. Generate a Solidity coverage report and commit it to your repository under this version’s directory.
<br> <br>

## Version 3.0

- Create a new directory in your Github repo called v3.0 and initialize a new hardhat project.
- Copy over any files you can reuse from the previous versions of this project into the directory for this version.
- Create a new contract called NFTDutchAuction_ERC20Bids.sol. It should have the same functionality as NFTDutchAuction.sol but accepts only ERC20 bids instead of Ether. 
  - The constructor for the NFTDutchAuction_ERC20Bids.sol should be: constructor(address erc20TokenAddress, address erc721TokenAddress, uint256 _nftTokenId, uint256 _reservePrice, uint256 _numBlocksAuctionOpen, uint256 _offerPriceDecrement)
- Write test cases to thoroughly test your contracts. Generate a Solidity coverage report and commit it to your repository under this version’s directory.
