import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

const WETH_ADDRESSES: Record<number, string> = {
  // testnet:
  13473: "0x1CcCa691501174B4A623CeDA58cC8f1a76dc3439",
  // mainnet:
  13371: "0x3a0c2ba54d6cbd3121f01b96dfd20e99d1696c9d",
};

const gasOverrides = {
  maxFeePerGas: "15000000005", // 15 gwei
  maxPriorityFeePerGas: "10000000005", // 10 gwei
};

/**
 * ZkEVM contracts
 *
 * WETH:
 *  - testnet: 0x1CcCa691501174B4A623CeDA58cC8f1a76dc3439
 *  - mainnet: 0x3a0c2ba54d6cbd3121f01b96dfd20e99d1696c9d
 *
 * Multicall:
 *  - testnet: 0x965B104e250648d01d4B3b72BaC751Cde809D29E
 *  - mainnet: 0xD51BFa777609213A653a2CD067c9A0132a2D316A
 *
 *  Factory:
 *  - testnet: 0x999f90f25a2922ae1b21A06066F7EDEbedad42a9
 *  - mainnet: 0xB519520A9163dEf547c77892A91c83E9e66e8762
 *
 *  Router V2:
 *  - testnet: 0xe4c10B25979773090f6d86A0A6108c402a3f7E27
 *  - mainnet: 0x4d4dA82c00d1288e2997739D130E31c2c9Db402b
 */

task("deploy-zkevm", "deploys the Uniswap contracts").setAction(async function (
  tArgs: TaskArguments,
  { ethers, run, network },
) {
  console.log("Compiling...");
  await run("compile");

  const WETH = WETH_ADDRESSES[network.config.chainId || 0];
  if (!WETH) {
    throw new Error(`No WETH address configured for chainId ${network.config.chainId}`);
  }

  const signers: SignerWithAddress[] = await ethers.getSigners();
  console.log("Starting deployment...");

  // deploy factory
  const factory = await ethers.getContractFactory("UniswapV2Factory");
  const factoryInstance = await factory.deploy(signers[0].address, gasOverrides);
  await factoryInstance.deployed();

  console.log(`Factory deployed to: ${factoryInstance.address}`);

  // deploy router
  const router = await ethers.getContractFactory("UniswapV2Router02");
  const routerInstance = await router.deploy(factoryInstance.address, WETH, gasOverrides);
  await routerInstance.deployed();

  console.log(`Router V02 deployed to: ${routerInstance.address}`);
});
