// @ts-ignore
import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("----------------------------------------------------");
  log("Deploying Token and waiting for confirmations...");
  const Token = await deploy("VegeCoin", {
    from: deployer,
    args: [],
    log: true,
  });
  log(`Token at ${Token.address}`);
  log(`Delegating to ${deployer}`);
  await delegate(Token.address, deployer);
  log("Delegated!");
};

const delegate = async (TokenAddress: string, delegatedAccount: string) => {
  const Token = await ethers.getContractAt("VegeCoin", TokenAddress);
  const transactionResponse = await Token.delegate(delegatedAccount);
  await transactionResponse.wait(1);
  console.log(`Checkpoints: ${await Token.numCheckpoints(delegatedAccount)}`);
};

export default deployToken;
deployToken.tags = ["all", "governor"];
