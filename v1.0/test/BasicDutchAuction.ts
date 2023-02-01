import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";

describe("BasicDutchAuction", function () {
  async function deployBasicDutchAuctionFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, otherAccount2, otherAccount3] = await ethers.getSigners();

    const BasicDutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
    const basicDutchAuction = await BasicDutchAuctionFactory.deploy(100,10,10);

    return { basicDutchAuction, owner, otherAccount, otherAccount2, otherAccount3 };
  }

  describe("BasicDutchAuction Deployment", function () {

    it('Check seller is owner', async function () {

      const { basicDutchAuction, owner } = await loadFixture(deployBasicDutchAuctionFixture);
      expect(await basicDutchAuction.seller()).to.equal(owner.address);

    });

    it("Product is still available for bid", async function () {
      const { basicDutchAuction, owner } = await loadFixture(deployBasicDutchAuctionFixture);

      expect(await basicDutchAuction.buyer()).to.equal(ethers.constants.AddressZero);

    });

    it("Auction Status is Open", async function () {
      const { basicDutchAuction, owner } = await loadFixture(deployBasicDutchAuctionFixture);

      expect(await basicDutchAuction.auctionStatusOpen()).to.equal(true);

    });


    it("Number of rounds", async function () {
      const { basicDutchAuction, owner } = await loadFixture(deployBasicDutchAuctionFixture);
      const hashOfTx = basicDutchAuction.deployTransaction.hash;
      const initBlock = (await basicDutchAuction.provider.getTransactionReceipt(hashOfTx)).blockNumber;
      const currentBlock = await ethers.provider.getBlockNumber();
      expect(10).to.greaterThanOrEqual(currentBlock-initBlock);

    });


    it("Successful Bid and wallet balance checks", async function () {
      const { basicDutchAuction, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);

      const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);

      expect(await basicDutchAuction.connect(otherAccount).bid({value: 1000}));

      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);

      expect(await basicDutchAuction.connect(owner).buyer()).to.equal(otherAccount.address);
      expect(ownerBalanceAfter.sub(ownerBalanceBefore).toNumber()).to.equal(await basicDutchAuction.currentPrice());

    });

    it("You already bought this product", async function () {
      const { basicDutchAuction, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);

      expect(await basicDutchAuction.connect(otherAccount).bid({value:1000})).to.be.revertedWith("You already bought this product");

    });

    it("failure Bid as item is already sold", async function () {
      const { basicDutchAuction, owner, otherAccount2 } = await loadFixture(deployBasicDutchAuctionFixture);

      expect(await basicDutchAuction.connect(otherAccount2).bid({value: 100000})).to.be.revertedWith("Product already sold");
    });

  });
});
