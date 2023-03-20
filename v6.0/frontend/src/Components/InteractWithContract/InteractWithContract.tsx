import "./InteractwithContract.css";
import React, {useEffect} from "react";
import {ethers} from "ethers";
import ABI from "../../artifacts/contracts/BasicDutchAuction.sol/BasicDutchAuction.json";
import {reactLocalStorage} from 'reactjs-localstorage';

// @ts-ignore
const InteractWithContract = () => {
    const getInfo = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const adr = reactLocalStorage.get('var');

        const basicDutchAuction = new ethers.Contract(
            adr.toString(),
            ABI.abi,
            signer
        );

        const status = await basicDutchAuction.auctionStatusOpen();
        const price = await basicDutchAuction.currentPrice();
        const seller = await basicDutchAuction.seller();
        const buyer = await basicDutchAuction.buyer();

        // Get the elements where the values will be displayed
        const statusElement = document.getElementById('status');
        const priceElement = document.getElementById('price');
        const sellerElement = document.getElementById('seller');
        const buyerElement = document.getElementById('buyer');
        const contractElement = document.getElementById('contract');

        // Update the text content of the elements with the variable values
        if (buyerElement !== null) {
            buyerElement.textContent = buyer;
        }

        if (sellerElement !== null) {
            sellerElement.textContent = seller;
        }

        if (priceElement !== null) {
            priceElement.textContent = price;
        }

        if (statusElement !== null) {
            statusElement.textContent = status;
        }

        if (contractElement !== null) {
            contractElement.textContent = reactLocalStorage.get('var');
        }
    }


    useEffect(() => {
        getInfo();
    }, []);

    const bid = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const adr:string = reactLocalStorage.get('var');


        try {

            const bidInput = document.getElementById("Bid Price") as HTMLInputElement;

            const bidValue = bidInput.value;
            console.log("bid");
            console.log(bidValue)

            const basicDutchAuction = new ethers.Contract(
                adr,
                ABI.abi,
                signer
            );

            const biding = await basicDutchAuction.bid({value: `${bidValue}`});

            const winner = await basicDutchAuction.buyer();
            window.alert(`You are the winner and your tx hash is ${biding.hash}`);
            console.log(biding)

        } catch (error: any) {
            window.alert(
                'Error!' + (error && error.reason ? `\n\n${error.reason}` : `${error.message}`)
            );
        }


    }

    return (
        <section>

            <div className="container">

                <div className={"how-it-works"}>
                    <h3>The BasicDutchAuction.sol contract works as follows:</h3>
                    <ol>
                        <li>The seller instantiates a DutchAuction contract to manage the auction of a single, physical item at a single auction event.<br></br>
                            The contract is initialized with the following parameters:</li>
                        <ul>
                            <li>reservePrice: the minimum amount of wei that the seller is willing to accept for the item</li>
                            <li>numBlocksAuctionOpen: the number of blockchain blocks that the auction is open for</li>
                            <li>reservePrice: the minimum amount of wei that the seller is willing to accept for the item</li>
                            <li>offerPriceDecrement: the amount of wei that the auction price should decrease by during each subsequent block</li>
                        </ul>
                        <li>The seller is the owner of the contract</li>
                        <li>The auction begins at the block in which the contract is created</li>
                        <li>The initial price of the item is derived from reservePrice, numBlocksAuctionOpen, and  offerPriceDecrement: initialPrice = reservePrice + numBlocksAuctionOpen*offerPriceDecrement</li>
                        <li>A bid can be submitted by any Ethereum externally-owned account.</li>
                        <li>The first bid processed by the contract that sends wei greater than or equal to the current price is the  winner. The wei should be transferred immediately to the seller and the contract should not accept  any more bids. All bids besides the winning bid should be refunded immediately.</li>
                    </ol>
                </div>

                <div className="info">
                    <ul>
                        <li className={"label"}>Status</li>
                        <li id="status"></li>
                        <li className={"label"}>Current Price</li>
                        <li id="price"></li>
                        <li className={"label"}>Contract</li>
                        <li id="contract"></li><br></br><br></br>
                        <li className={"label"}>Seller</li>
                        <li id="seller"></li>
                        <li className={"label"}>Buyer</li>
                        <li id="buyer"></li>
                    </ul>
                    <br></br><div className="deploy-btn">
                        <button onClick={getInfo}><a href="#">Get Info</a></button>
                    </div>
                </div>


                <div className="params">
                    <label htmlFor="Bid Price" className="paramLabel">Your Bid Price</label>
                    <input id="Bid Price" type="text" placeholder="<Bid price>"></input>
                </div>
                <div className="deploy-btn">
                    <button onClick={bid}><a href="#">Bid</a></button>
                </div>
            </div>



        </section>


    );



}

export default InteractWithContract;
