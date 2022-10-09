import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";

describe("Governor", async function () {
  const CONTRACT_NAME = "VegeGovernor";
  const TOKEN_CONTRACT_NAME = "VegeCoin";
  const TIMELOCK_CONTRACT_NAME = "TimeLock";
  const votingPeriod = 4;
  async function deployGovernorFixture() {
    const [owner, proposer, voter1, voter2, voter3, voter4] = await ethers.getSigners();

    const Governor = await ethers.getContractFactory(CONTRACT_NAME);
    const Token = await ethers.getContractFactory(TOKEN_CONTRACT_NAME);
    const TimeLock = await ethers.getContractFactory(TIMELOCK_CONTRACT_NAME);

    const hardhatTimeLock = await TimeLock.deploy(votingPeriod, [proposer.address], [owner.address]);
    const hardhatToken = await Token.deploy();

    await hardhatToken.transfer(voter1.address, 10);
    await hardhatToken.transfer(voter2.address, 7);
    await hardhatToken.transfer(voter3.address, 5);
    await hardhatToken.transfer(voter4.address, 10);

    const hardhatGovernor = await Governor.deploy(hardhatToken.address, hardhatTimeLock.address);
    await hardhatGovernor.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { hardhatGovernor, Token, hardhatToken, owner, proposer, voter1, voter2, voter3, voter4 };
  }

  it("allows people to make proposals", async function () {
    const { hardhatGovernor } = await loadFixture(deployGovernorFixture);

    // console.log(hardhatGovernor);
  });
});
