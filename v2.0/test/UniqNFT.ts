import {  loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("UniqNFT", function () {
    async function deployUniqNFTFixture() {

        const [owner, otherAccount] = await ethers.getSigners();

        const UniqNFTFactory = await ethers.getContractFactory("UniqNFT");
        const uniqNFTFactory = await UniqNFTFactory.connect(owner).deploy(10);

        return { uniqNFTFactory, owner, otherAccount };
    }

    describe("UniqNFT Deployment", function () {

        it('Mint an NFT', async function () {

            const { uniqNFTFactory, owner } = await loadFixture(deployUniqNFTFixture);
            expect(await uniqNFTFactory.safeMint(owner.address));
            expect(await uniqNFTFactory.ownerOf(1)).to.equal(owner.address);

        });

        it('Check supply', async function () {

            const { uniqNFTFactory, owner } = await loadFixture(deployUniqNFTFixture);
            expect(await uniqNFTFactory.currentSupply()).to.equal(1);
            expect(await uniqNFTFactory.maxSupply()).to.equal(10);

        });

    });
});