pragma solidity ^0.4.17;

contract GoalRegistry {
    address[] goals;
  function registerContract(address contractA) public {
    goals.push(contractA);
  }

  function getGoals() public view returns (address[]) {
      return goals;
  }
}