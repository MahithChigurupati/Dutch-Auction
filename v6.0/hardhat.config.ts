import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'solidity-coverage';

const ALCHEMY_API_KEY = "MOvkRXdimrAjyGqOu8IyARkjVChC1UmU";
const SEPOLIA_PRIVATE_KEY = "feba66b8439ee9a5c87ef4063001bb0e3db3da071be2066a0b743bca7ff832ab";

const config: HardhatUserConfig = {

  solidity: "0.8.18",
  paths:{
    artifacts:'./frontend/src/artifacts',
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }

};


export default config;
