import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("deploy", "deploys the Uniswap contracts")
  //.addParam("foo", "description", "optionalDefault")
  .setAction(async function (tArgs: TaskArguments, { ethers, run }) {
    console.log("Compiling...");
    await run("compile");

    const signers: SignerWithAddress[] = await ethers.getSigners();
    console.log("Starting deployment...");

    // deploy wrapped native currency
    const weth = await ethers.getContractFactory("WETH");
    const wethInstance = await weth.deploy();
    await wethInstance.deployed();

    console.log(`WETH deployed to: ${wethInstance.address}`);

    // deploy factory
    const factory = await ethers.getContractFactory("UniswapV2Factory");
    const factoryInstance = await factory.deploy(signers[0].address);
    await factoryInstance.deployed();

    console.log(`Factory deployed to: ${factoryInstance.address}`);

    // deploy router
    const router = await ethers.getContractFactory("UniswapV2Router02");
    const routerInstance = await router.deploy(factoryInstance.address, wethInstance.address);
    await routerInstance.deployed();

    console.log(`Router V02 deployed to: ${routerInstance.address}`);

    // deploy multicall
    const multicall = await ethers.getContractFactory("Multicall");
    const multicallInstance = await multicall.deploy();
    await multicallInstance.deployed();

    console.log(`Multicall deployed to: ${multicallInstance.address}`);
  });
