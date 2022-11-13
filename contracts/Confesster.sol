// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Confesster {
    string public name = "Confesster";
    uint public constant coffeePrice = 0.0001 ether;

    using Counters for Counters.Counter;
    Counters.Counter public confessionsCount;
    Counters.Counter public coffeesCount;

    mapping(uint256 => Confession) public confessions;

    struct Confession {
        uint256 id;
        string hash;
        string message;
        string category;
        address author;
        uint256 timestamp;
    }

    event ConfessionCreated(
        uint256 id,
        string hash,
        string message,
        string category,
        address author,
        uint256 timestamp
    );

    event CoffeeBought(
        uint256 id,
        address buyer,
        address author,
        string message,
        uint256 timestamp
    );

    constructor() {
        console.log("Deploying a Confesster...");
    }

    function createConfession(
        string memory _message,
        string memory _hash,
        string memory _category
    ) public {
      // Make validations
      require(bytes(_message).length > 0, "Message must not be empty");
      require(bytes(_hash).length > 0, "Hash must not be empty");
      require(bytes(_category).length > 0, "Category must not be empty");
      require(msg.sender != address(0x0), "Sender must not be empty");

      // Increment the confession count
      confessionsCount.increment();
      uint256 id = confessionsCount.current();

        // Create the confession
        confessions[id] = Confession(
            id,
            _hash,
            _message,
            _category,
            msg.sender,
            block.timestamp
        );
        // Trigger an event
        emit ConfessionCreated(id, _hash, _message, _category, msg.sender, block.timestamp);
    }

    function buyCoffee(
        address _author,
        string memory _message
    ) public payable {
        // Make Validations
        require(bytes(_message).length > 0, "Message must not be empty");
        require(msg.sender != address(0x0), "Sender must not be empty");
        require(msg.value == coffeePrice, "Coffee price must be 0.0001 ether");
        require(msg.sender != _author, "You can't buy coffee for yourself");

        // Increment the coffee count
        coffeesCount.increment();
        uint256 id = coffeesCount.current();

        // Send the author the coffee price
        payable(_author).transfer(msg.value);

        // Trigger an event
        emit CoffeeBought(id, msg.sender, _author, _message, block.timestamp);
    }
       
}

