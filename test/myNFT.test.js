const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
    it("Should deploy and have correct name", async function () {
        const [owner] = await ethers.getSigners();
        const MyToken = await ethers.getContractFactory("MyToken");

        const initialSupply = ethers.parseUnits("1000", 18); // ethers v6
        const myToken = await MyToken.deploy(initialSupply);  // deploy xong là sẵn sàng

        // Kiểm tra thông tin
        expect(await myToken.name()).to.equal("MyToken");
        expect(await myToken.symbol()).to.equal("MTK");
        expect(await myToken.totalSupply()).to.equal(initialSupply);
        expect(await myToken.balanceOf(owner.address)).to.equal(initialSupply);
    });
});
