import React from 'react';
import './NavBar.css';
import logo from '../../logo.svg'
import {ethers} from 'ethers';

declare global {
    interface Window {
        ethereum: any;
    }
}

class NavBar extends React.Component{
    connect = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts",[]);
        console.log("trying to connect");
    };

    render(){
        return (
            <div className="NavBar">
                <header>
                    <nav>
                        <div className="logo">
                            <a href="/"><img alt="NFT Dutch Auction" width="75" src={logo}></img></a>
                        </div>

                        <div>
                            <ul>
                                <li><a href="/"> Home </a> </li>
                                <li><a href="#DeployContract"> Deploy </a> </li>
                                <li><a href="#InteractWithContract"> Buy NFT </a> </li>
                                <li className="nav-cta"><button onClick={this.connect}>Connect</button></li>
                            </ul>
                        </div>
                    </nav>

                </header>
            </div>
        );
    }
}

export default NavBar;
