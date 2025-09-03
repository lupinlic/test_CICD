const hre = require("hardhat");

async function main() {
    const MyToken = await ethers.getContractFactory("MyToken");
    const initialSupply = ethers.parseUnits("1000", 18); // ethers v6
    const myToken = await MyToken.deploy(initialSupply);

    console.log("MyToken deployed to:", myToken.target); // ethers v6 dùng .target thay cho .address
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

