const ContractValidator = artifacts.require('ContractValidator');

module.exports = function (deployer) {
  deployer.deploy(ContractValidator);
};
