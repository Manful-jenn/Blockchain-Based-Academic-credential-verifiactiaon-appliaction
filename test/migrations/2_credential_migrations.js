const Migrations = artifacts.require("CertificateIssuer");

module.exports = function (deployer) {
    deployer.deploy(Migrations);
};
