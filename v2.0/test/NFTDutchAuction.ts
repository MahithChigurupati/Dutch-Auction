import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTDutchAuction", function () {
  async function deployBasicDutchAuctionFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

    const NFTDutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
    const nftDutchAuctionFactory = await NFTDutchAuctionFactory.deploy(100,10,10);

    return { nftDutchAuctionFactory, owner, otherAccount, otherAccount2 };
  }

  describe("BasicDutchAuction Deployment", function () {

    it('Check seller is owner', async function () {

      const { nftDutchAuctionFactory, owner } = await loadFixture(deployBasicDutchAuctionFixture);
      expect(await nftDutchAuctionFactory.seller()).to.equal(owner.address);

    });
  });
});