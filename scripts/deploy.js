const hre = require("hardhat");

async function main() {
    const MyERC1155 = await hre.ethers.getContractFactory("MyToken");
    const myERC1155 = await MyERC1155.deploy();

    // ethers v6: chờ contract deploy xong
    await myERC1155.waitForDeployment();

    console.log("MyERC1155 deployed to:", await myERC1155.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
