import "./InteractwithContract.css";
import React from "react";

import {ethers} from "ethers";
import ABI from "../../artifacts/contracts/BasicDutchAuction.sol/BasicDutchAuction.json";
import {reactLocalStorage} from 'reactjs-localstorage';

// @ts-ignore
class InteractWithContract extends React.Component{

    getInfo = async () => {
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

    bid = async () => {
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
            window.alert(`You are the winner and your tx hash is ${biding.hash}`);

        } catch (error: any) {
            window.alert(
                'Error!' + (error && error.reason ? `\n\n${error.reason}` : `${error.message}`)
            );
        }
    }

    render() {
        return (
            <section id={"InteractWithContract"}>
                <div className="container">

                    <div className="info">
                        <ul>
                            <li className={"label"}>Status</li>
                            <li id="status"></li>
                            <li className={"label"}>Current Price</li>
                            <li id="price"></li>
                            <li className={"label"}>Contract</li>
                            <li id="contract"></li>
                            <br></br><br></br>
                            <li className={"label"}>Seller</li>
                            <li id="seller"></li>
                            <li className={"label"}>Buyer</li>
                            <li id="buyer"></li>
                        </ul>
                    </div>

                    <div className="deploy-btn">
                        <button onClick={this.getInfo}>Get Info</button>
                    </div>

                    <div className="params">
                        <label htmlFor="Bid Price" className="paramLabel">Your Bid Price</label>
                        <input id="Bid Price" type="text" placeholder="<Bid price>"></input>
                    </div>

                    <div className="deploy-btn">
                        <button onClick={this.bid}>Bid</button>
                    </div>
                </div>
            </section>
        );
    }
}

export default InteractWithContract;
