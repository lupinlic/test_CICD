// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyERC721 is ERC721 {
    uint256 public nextId = 1;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mint(address to) external {
        _safeMint(to, nextId);
        nextId++;
    }
}
