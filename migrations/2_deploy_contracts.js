const Squares = artifacts.require('./Squares.sol');

module.exports = function deployContracts(deployer) {
  deployer.deploy(Squares);
};
