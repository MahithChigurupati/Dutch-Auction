import { HardhatUserConfig } from "hardhat/config";
import 'solidity-coverage'
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
};

export default config;
