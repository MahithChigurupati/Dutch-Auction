import React from 'react';
import './App.css';
import logo from './logo.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import {useState, useEffect} from 'react';
import {ethers} from 'ethers';

import Homepage from "./Components/HomePage/HomePage";
import DeployContract from "./Components/DeployContract/DeployContract";
import InteractWithContract from "./Components/InteractWithContract/InteractWithContract";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts",[]);
    console.log("trying to connect");
  };

  return (
    <div className="App">
      <header>

        <nav>
          <div className="logo">
            <a href="/"><img alt="NFT Dutch Auction" width="75" src={logo}></img></a>

          </div>

          <ul>
            <li><a href="/"> Home </a> </li>
            <li><a href="/DeployContract"> Deploy </a> </li>
            <li><a href="/InteractWithContract"> Buy NFT </a> </li>
            <li className="nav-cta"><a href="#" onClick={connect}> Connect </a></li>
          </ul>
        </nav>

      </header>

      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/DeployContract" element={<DeployContract />} />
          <Route path="/InteractWithContract" element={<InteractWithContract />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
