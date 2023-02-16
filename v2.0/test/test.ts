
/*describe("NFTDutchAuction", function () {

  async function deployNFTDutchAuctionFixture() {

    const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

    const NFTDutchAuctionFactory = await ethers.getContractFactory("NFTDutchAuction");
    const nftDutchAuctionFactory = await NFTDutchAuctionFactory.connect(owner).deploy("",1,100,10,10);

    return { nftDutchAuctionFactory, owner, otherAccount, otherAccount2 };
  }

  describe("NFTDutchAuction Deployment", function() {

    it('check If seller is owner', async function () {

      const { nftDutchAuctionFactory, owner } = await loadFixture(deployNFTDutchAuctionFixture);
      expect(await nftDutchAuctionFactory.seller()).to.equal(owner.address);

    });

    it('check If seller is owner', async function () {

      const { nftDutchAuctionFactory, owner } = await loadFixture(deployNFTDutchAuctionFixture);
      expect(await nftDutchAuctionFactory.seller()).to.equal(owner.address);

    });

    it('Seller is not allowed to Bid', async function () {

      const { nftDutchAuctionFactory, owner } = await loadFixture(deployNFTDutchAuctionFixture);
      expect(await nftDutchAuctionFactory.connect(owner.address).bid()).to.be.revertedWith("Owner can't Bid");

    });

    it('Wei is insufficient', async function () {

      const { nftDutchAuctionFactory, owner } = await loadFixture(deployNFTDutchAuctionFixture);
      expect(await nftDutchAuctionFactory.connect(owner.address).bid({value: 10})).to.be.revertedWith("WEI is insufficient");

    });

    it('Seller is not allowed to Bid', async function () {

      const { nftDutchAuctionFactory, owner } = await loadFixture(deployNFTDutchAuctionFixture);
      expect(await nftDutchAuctionFactory.connect(owner.address).bid()).to.be.revertedWith("Owner can't Bid");

    });

    it('Successful Bid', async function () {

      const { nftDutchAuctionFactory, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);
      await nftDutchAuctionFactory.connect(otherAccount).bid({value: 250});
      expect(nftDutchAuctionFactory.buyer()).to.equal(otherAccount.address);

    });

    // it('Check Balances', async function () {
    //
    //   const { nftDutchAuctionFactory,owner ,otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);
    //   const ownerBalanceBefore = await owner.getBalance();
    //   const otherAccountBalanceBefore = await otherAccount.getBalance();
    //   await nftDutchAuctionFactory.connect(otherAccount).bid({value: 250})
    //   const ownerBalanceAfter = await owner.getBalance();
    //   const otherAccountBalanceAfter = await otherAccount.getBalance();
    //   const price = await nftDutchAuctionFactory.currentPrice();
    //   expect(ownerBalanceBefore ).to.equal(ownerBalanceAfter);
    //   expect(await nftDutchAuctionFactory.connect(otherAccount).bid({value: 250})).to.be.revertedWith("You already bought this product");
    //
    // });


    it('You already bought this product', async function () {

      const { nftDutchAuctionFactory, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);

      expect(await nftDutchAuctionFactory.connect(otherAccount).bid({value: 250})).to.be.revertedWith("You already bought this product");

    });

    it('Product already sold', async function () {

      const { nftDutchAuctionFactory, otherAccount2 } = await loadFixture(deployNFTDutchAuctionFixture);

      expect(await nftDutchAuctionFactory.connect(otherAccount2).bid({value: 250})).to.be.revertedWith("Product already sold");

    });

    it('Auction is closed', async function () {

      const { nftDutchAuctionFactory, otherAccount2 } = await loadFixture(deployNFTDutchAuctionFixture);

      expect(await nftDutchAuctionFactory.auctionStatusOpen()).to.false;

    });


  });
});

 */
