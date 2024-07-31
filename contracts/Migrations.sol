// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
    address public owner;
    uint public last_completed_migration;

    event MigrationCompleted(uint completed);
    event Upgraded(address new_address);

    constructor() {
        owner = msg.sender; // Assign the contract deployer as the owner
    }

    modifier restricted() {
        require(
            msg.sender == owner, "This function is restricted to the contract owner"
        );
        _;
    }

    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
        emit MigrationCompleted(completed);
    }

    function upgrade(address new_address) public restricted {
        require(new_address != address(0), "Invalid address");
        Migrations upgraded = Migrations(new_address); // Ensure new_address is valid
        upgraded.setCompleted(last_completed_migration);
        emit Upgraded(new_address);
    }
}
