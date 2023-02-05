/**
* @title NFT Dutch Auction Smart Contract
* @author SaiMahith Chigurupati
* Note: Version 2.0
* Create a new directory in your Github repo called v2.0 and initialize a new hardhat project.
* Copy over any files you can reuse from the previous versions of this project into the directory for this version.
* Understand how the ERC721 contract works by downloading an off-the-shelf version from OpenZeppellin, and write test cases so you understand how to create NFT contracts, how to mint NFTs, and how to transfer them. ERC721 is the official name for Ethereum’s NFT contract specification.
* To add contracts from OpenZeppellin into your project, definitely use npm to download them. The OpenZeppellin contracts have a lot of dependencies, and thus copying and pasting them will
1) take a lot of time,
2) will make it hard to upgrade to newer versions,
3) increase the vulnerability scope of your project, and 4) make it more likely for those contracts to get changed by you or your team.
* Create a new contract called NFTDutchAuction.sol. It should have the same functionality as BasicDutchAuction.sol but it sells an NFT instead of a physical item. The constructor for the NFTDutchAuction.sol should be:
  constructor(address erc721TokenAddress, uint256 _nftTokenId, uint256 _reservePrice, uint256 _numBlocksAuctionOpen, uint256 _offerPriceDecrement)
* Add an upgrade proxy to make your NFTDutchAuction.sol upgradeable.
* Read the documentation on upgradeable contracts
* Write test cases to thoroughly test your contracts. Generate a Solidity coverage report and commit it to your repository under this version’s directory.
*/

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IUniqueNFT{

    function transferFrom(address _from, address _to, uint _nftId) external;

    function ownerOf(uint id) external view returns (address owner);
}

contract NFTDutchAuction {

    uint256 nftId;
    IUniqueNFT nftAddress;

    /*** state variables ***/
    uint256 private reservePrice;
    uint256 private numBlocksAuctionOpen;
    uint256 private offerPriceDecrement;

    address public buyer;
    address public seller;

    //a variable initBlock holds the block number in which the contract is instantiated by seller/owner
    // a variable initialPrice holds the initial price set by seller to accept bids
    uint256 private initBlock;
    uint256 private initialPrice;
    bool public auctionStatusOpen;

    /**
    * @param erc721TokenAddress - price slash block by block
    * @param _nftTokenId - price slash block by block
    * @param _reservePrice - the base price till which seller will accept bids
    * @param _numBlocksAuctionOpen - number of blocks after which this contract will expire
    * @param _offerPriceDecrement - price slash block by block
    */
    constructor(address erc721TokenAddress,
        uint256 _nftTokenId, uint256 _reservePrice,
        uint256 _numBlocksAuctionOpen, uint256 _offerPriceDecrement){

        seller = payable(msg.sender);
        initBlock = block.number;
        auctionStatusOpen = true;

        // nftAddress = erc721TokenAddress;
        nftId = _nftTokenId;
        nftAddress = IUniqueNFT(erc721TokenAddress);

        //check if seller is the owner of nftAddress
        require(nftAddress.ownerOf(nftId) == seller,"You don't own this NFT to sell");

        //assigning local variables to state variables
        reservePrice = _reservePrice;
        numBlocksAuctionOpen = _numBlocksAuctionOpen;
        offerPriceDecrement = _offerPriceDecrement;

        //calculating the initial price based on reservePrice, numBlocksAuctionOpen, offerPriceDecrement
        initialPrice = reservePrice + (numBlocksAuctionOpen * offerPriceDecrement);

    }

    // @return block.number - currentBlock function returns the current Block number used on the chain
    function currentBlock() view private returns(uint256){
        return block.number;
    }

    // @return the block difference between the initialised block and the current block in the chain
    function blockDifference() view private returns(uint256){
        return currentBlock() - initBlock;
    }

    // @return the price of Bid that this Dutch auction contract is accepting right now
    function currentPrice() view public returns(uint256){
        return initialPrice - (blockDifference() * offerPriceDecrement);
    }

    //@return the Auction Status
    function isAuctionOpen() view private returns(bool){
        return blockDifference() <= numBlocksAuctionOpen;
    }

    //finalizing the auction status
    function finalize() private{
        nftAddress.transferFrom(seller, msg.sender , nftId);
        buyer = nftAddress.ownerOf(nftId);
        auctionStatusOpen = false;
    }

    //@param excessAmount - excess amount sent by buyer
    function refund(uint excessAmount) private{
        payable(msg.sender).transfer(excessAmount);
    }

    /**
     * @notice A function that accept bids from any externally owned accounts(EOA)
     * check if the product is already bought if yes then revert the payment
     * check if the Auction is still open for the current block number
     * check if the amount sent by bidder is equal to current price
     * make a transfer to seller or revert the transaction if fails
    */
    function bid() public payable {

        //checking the block limit set by the seller to see if Auction is still open
        require(isAuctionOpen(), "Auction is closed");

        //checking if buyer is bidding again
        require(msg.sender != buyer, "You already bought this product");

        //checking if product is available in the market
        require(buyer == address(0), "Product already sold");

        //checking if Bidder is owner of the contract
        require(msg.sender != seller, "Owner can't Bid");

        //condition to check if bidder sent the right amount that matches the current price of the item sold
        require(msg.value >= currentPrice(),"WEI is insufficient");

        //transferring the amount to seller
        (bool tryToSend, ) = seller.call{ value: currentPrice() }("");
        require(tryToSend == true, "failed to send");

        // refund the excess amount if excess amount is sent
        uint256 excess = msg.value - currentPrice();

        if(excess > 0){
            refund(excess);
        }

        //finalizing the auction
        finalize();

    }

}