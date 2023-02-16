import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Minting & Auctioning NFT", function () {
    async function deployOneYearLockFixture() {

        const [owner, otherAccount] = await ethers.getSigners();

        const UniqNFTFactory = await ethers.getContractFactory("UniqNFT");
        const uniqNFTFactory = await UniqNFTFactory.connect(owner).deploy(10);

        return { uniqNFTFactory, owner, otherAccount };
    }

    describe("Mint", function () {
        it("Safe Mint NFT", async function () {
            const { uniqNFTFactory, owner } = await loadFixture(deployOneYearLockFixture);
            expect(await uniqNFTFactory.safeMint(owner.address));
        });

        it("Malicious Mint failure", async function () {
            const { uniqNFTFactory, otherAccount } = await loadFixture(deployOneYearLockFixture);
            await expect(uniqNFTFactory.connect(otherAccount).safeMint(otherAccount.address)).eventually.to.rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner");
        });

        it("Dutch Auction Deployment", async function () {
            const { uniqNFTFactory, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);
            expect(uniqNFTFactory.safeMint(owner.address));

            const NFTDutchAuctionFactory = await ethers.getContractFactory("NFTDutchAuction");
            const nftDutchAuction = await NFTDutchAuctionFactory.deploy(uniqNFTFactory.address, 1, 100, 10, 10);

            expect(await nftDutchAuction.seller()).to.equal(owner.address);

            describe("Before Approval", function () {
                it("Seller can't Bid", async function () {

                    await expect(nftDutchAuction.connect(owner).bid({value:200})).to.be.revertedWith('Owner can\'t Bid');
                });

                it("No Approval to spend", async function () {
                    await expect(nftDutchAuction.connect(otherAccount).bid({value:200})).to.be.revertedWith('ERC721: caller is not token owner or approved');
                });

                it("Incorrect NFT ID", async function(){
                    await expect(uniqNFTFactory.approve(nftDutchAuction.address, 11)).to.be.revertedWith('ERC721: invalid token ID');
                });

                it("only owner can approve", async function () {
                    await expect(uniqNFTFactory.connect(otherAccount).approve(nftDutchAuction.address,1)).to.be.revertedWith('ERC721: approve caller is not token owner or approved for all');
                });
                it("Approve the spend", async function () {
                    expect(await uniqNFTFactory.approve(nftDutchAuction.address,1));
                    describe("Try to Bid", function () {
                        it("Insufficient Funds", async function () {
                            await expect(nftDutchAuction.connect(otherAccount).bid({from: otherAccount.address, value: 100 })).to.be.revertedWith('WEI is insufficient');
                        });

                        it("Successful Bid", async function () {
                            await expect(nftDutchAuction.connect(otherAccount).bid({from: otherAccount.address, value: 200 }));
                        });

                        it("Auction closed", async function () {
                            await expect(nftDutchAuction.connect(otherAccount).bid({from: otherAccount.address, value: 210 })).to.be.revertedWith('You already bought this product');
                        });
                    });

                });
            });

        });

    });
});