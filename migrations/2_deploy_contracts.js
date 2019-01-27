var GoalRegistry = artifacts.require("./GoalRegistry.sol");

module.exports = function(deployer) {
  deployer.deploy(GoalRegistry, { overwrite: false });
};
