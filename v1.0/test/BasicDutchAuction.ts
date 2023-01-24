import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BasicDutchAuction", function () {
  async function deployBasicDutchAuctionFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BasicDutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
    const basicDutchAuction = await BasicDutchAuctionFactory.deploy(10000000000000000000,10,1000000000000000000);

    return { basicDutchAuction, owner, otherAccount };
  }

  describe("BasicDutchAuction Deployment", function () {

    it("Should set the right unlockTime", async function () {
      const { basicDutchAuction, owner } = await loadFixture(deployBasicDutchAuctionFixture);

      expect(await basicDutchAuction.currentPrice()).to.equal(10000000000000000000 +(10 * 1000000000000000000));

    });
  });
});
