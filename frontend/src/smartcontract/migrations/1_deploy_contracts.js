var NFTMarketplace = artifacts.require("NFTMarketplace.sol");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(NFTMarketplace);
};
