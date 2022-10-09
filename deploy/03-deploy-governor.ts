import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { QUORUM_PERCENTAGE, VOTING_DELAY, VOTING_PERIOD } from "../helper-hardhat-config";

const deployGovernance: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const Token = await get("VegeCoin");
  const timeLock = await get("TimeLock");

  log("----------------------------------------------------");
  log("Deploying Governance...");
  const governance = await deploy("VegeGovernor", {
    from: deployer,
    args: [Token.address, timeLock.address, QUORUM_PERCENTAGE, VOTING_PERIOD, VOTING_DELAY],
    log: true,
  });
  log(`Governance at ${governance.address}`);
};

export default deployGovernance;
deployGovernance.tags = ["all", "governance"];
