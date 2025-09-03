// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableDAO {
    mapping(address => uint256) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Not enough balance");

        // ❌ gọi ra ngoài trước khi cập nhật số dư
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Failed to send ETH");

        balances[msg.sender] -= _amount;
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
