import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token contract", function () {
  const CONTRACT_NAME = "VegeCoin";
  async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const Token = await ethers.getContractFactory(CONTRACT_NAME);
    const [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // its deployed() method, which happens onces its transaction has been
    // mined.
    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { Token, hardhatToken, owner, addr1, addr2 };
  }

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory(CONTRACT_NAME);

    const hardhatToken = await Token.deploy();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    const [_, addr1, addr2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory(CONTRACT_NAME);

    const hardhatToken = await Token.deploy();

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
  });

  it("Should set the right owner", async function () {
    // We use loadFixture to setup our environment, and then assert that
    // things went well
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

    // `expect` receives a value and wraps it in an assertion object. These
    // objects have a lot of utility methods to assert values.

    // This test expects the owner variable stored in the contract to be
    // equal to our Signer's owner.
    expect(await hardhatToken.owner()).to.equal(owner.address);
  });

  it("should emit Transfer events", async function () {
    const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

    // Transfer 50 tokens from owner to addr1
    await expect(hardhatToken.transfer(addr1.address, 50))
      .to.emit(hardhatToken, "Transfer")
      .withArgs(owner.address, addr1.address, 50);

    // Transfer 50 tokens from addr1 to addr2
    // We use .connect(signer) to send a transaction from another account
    await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50))
      .to.emit(hardhatToken, "Transfer")
      .withArgs(addr1.address, addr2.address, 50);
  });

  it("Should fail if sender doesn't have enough tokens", async function () {
    const { hardhatToken, owner, addr1 } = await loadFixture(deployTokenFixture);
    const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

    // Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
    // `require` will evaluate false and revert the transaction.
    await expect(hardhatToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith(
      "ERC20: transfer amount exceeds balance",
    );

    // Owner balance shouldn't have changed.
    expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
  });
});
