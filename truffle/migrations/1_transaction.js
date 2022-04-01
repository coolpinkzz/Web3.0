const transaction = artifacts.require("Transactions");

module.exports = function (deployer) {
  deployer.deploy(transaction);
};
