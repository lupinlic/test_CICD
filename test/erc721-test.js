const { expect } = require("chai");

describe("MyERC721", function () {
    let nft, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        const NFT = await ethers.getContractFactory("MyERC721", owner);
        nft = await NFT.deploy();
    });

    it("should mint NFT to owner", async function () {
        await nft.mint(owner.address);
        expect(await nft.ownerOf(1)).to.equal(owner.address);
    });

    it("should transfer NFT", async function () {
        await nft.mint(owner.address);
        await nft.transferFrom(owner.address, addr1.address, 1);
        expect(await nft.ownerOf(1)).to.equal(addr1.address);
    });

    it("should fail if not owner tries transfer", async function () {
        await nft.mint(owner.address);
        await expect(
            nft.connect(addr1).transferFrom(owner.address, addr1.address, 1)
        ).to.be.revertedWithCustomError(nft, "ERC721InsufficientApproval");
    });
});
