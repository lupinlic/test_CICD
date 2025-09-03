const { expect } = require("chai");

describe("MyERC20", function () {
    let token, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("MyERC20", owner);
        token = await Token.deploy();
    });

    it("should mint initial supply to owner", async function () {
        const balance = await token.balanceOf(owner.address);
        expect(balance).to.equal(ethers.parseEther("1000"));
    });

    it("should transfer tokens", async function () {
        await token.transfer(addr1.address, 100);
        expect(await token.balanceOf(addr1.address)).to.equal(100);
    });

    it("should approve and transferFrom", async function () {
        await token.approve(addr1.address, 200);
        await token.connect(addr1).transferFrom(owner.address, addr1.address, 200);
        expect(await token.balanceOf(addr1.address)).to.equal(200);
    });

    it("should fail transfer when insufficient balance", async function () {
        await expect(
            token.connect(addr1).transfer(owner.address, 1)
        ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
    });
});
