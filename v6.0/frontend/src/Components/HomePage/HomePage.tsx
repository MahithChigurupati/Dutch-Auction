import "./HomePage.css";
import icon from "../../logo.svg";
import StatusBar from '../StatusBar/StatusBar'
import React from 'react';

class Homepage extends React.Component {
    render(){
        return (
            <section>
                <StatusBar />
                <div className={"hero"}>
                    <h1> NFT Dutch Auction</h1>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit corporis possimus, perferendis nulla deleniti, qui itaque aut aspernatur, hic eveniet quis delectus dolores laborum aliquid officiis ducimus recusandae laudantium adipisci?</p>
                    <button className="header-cta"><a href="#DeployContract">Deploy</a></button>
                    <button className="header-cta"><a href="#InteractWithContract">Buy</a></button>
                </div>

                <div >
                    <img alt="test" width="500" src={icon}></img>
                </div>

            </section>

        );
    }

}

export default Homepage;