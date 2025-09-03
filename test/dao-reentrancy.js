const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DAO Reentrancy Attack", function () {
    let dao, attackerContract, deployer, user, attacker;

    beforeEach(async function () {
        [deployer, user, attacker] = await ethers.getSigners();

        const DAO = await ethers.getContractFactory("VulnerableDAO", deployer);
        dao = await DAO.deploy();

        // user gửi 10 ETH
        await dao.connect(user).deposit({ value: ethers.parseEther("10") });

        const Attacker = await ethers.getContractFactory("Attacker", attacker);
        attackerContract = await Attacker.deploy(dao.address);
    });

    it("should drain all ETH from DAO", async function () {
        await attackerContract.connect(attacker).attack({ value: ethers.parseEther("1") });

        const daoBalance = await ethers.provider.getBalance(dao.address);
        expect(daoBalance).to.equal(0);

        const attackerBalance = await ethers.provider.getBalance(attackerContract.address);
        expect(attackerBalance).to.be.gt(ethers.parseEther("10")); // hacker hút được nhiều hơn vốn ban đầu
    });
});
