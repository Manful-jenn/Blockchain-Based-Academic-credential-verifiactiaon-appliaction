const express = require('express');
const router = express.Router();
const { Web3 } = require('web3');

// Import compiled contract ABI and contract address
const contractABI = require('../build/contracts/CertificateIssuer.json').abi;
const contractAddress = '0x1a1D969461573f2Dbd82E94f053A84f43F2027CB'; // Replace with your deployed contract address from Ganache

// Initialize Web3 provider and signer (ganache connection)
const web3 = new Web3('http://127.0.0.1:7545');
const privateKey = '0xb8ec6d7d1f53bcd492a3bed7587f9b38c4ce88853c0134e4dc22c8aaed121ace'; // Replace with your private key from Ganache
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Check connection to Ganache
web3.eth.getBlockNumber()
    .then(blockNumber => {
        console.log(`Connected to Ganache. Current block number: ${blockNumber}`);
    })
    .catch(error => {
        console.error('Failed to connect to Ganache:', error);
    });

router.post('/issueCertificate', async (req, res) => {
    try {
        const { data } = req.body;
        console.log("Received request to issue certificate with data:", data);

        // Stringify the data object
        const dataString = JSON.stringify(data);

        // Hardcode the recipient address
        const recipient = '0x437c9457693091A2Fb235b074d8C82E17c1446bA';

        // Interact with the smart contract
        const tx = await contract.methods.issueCertificate(recipient, dataString).send({ from: web3.eth.defaultAccount });
        console.log("Transaction initiated:", tx.transactionHash);

        res.status(200).json({ message: 'Certificate issued successfully', transactionHash: tx.transactionHash });
    } catch (error) {
        console.error("Error issuing certificate:", error);
        res.status(500).json({ message: 'Failed to issue certificate', error: error.message });
    }
});

// Example endpoint to verify certificate validity
// router.get('/verifyCertificate/:id', async (req, res) => {
//     try {
//         const certificateId = req.params.id;
//         const isValid = await contract.methods.verifyCertificate(certificateId).call();
//         res.status(200).json({ isValid });
//     } catch (error) {
//         console.error("Error verifying certificate:", error);
//         res.status(500).json({ message: 'Failed to verify certificate', error: error.message });
//     }
// });

router.get('/verifyCertificate/:id', async (req, res) => {
    try {
      const certificateId = req.params.id;
      const result = await contract.methods.verifyCertificate(certificateId).call();
  
      // Assuming the result contains both validity and the data in the returned object
      const isValid = result[0];
      const data = result[1];
  
      console.log(`Smart contract response: isValid=${isValid}, data=${data}`);
  
      if (isValid) {
        res.status(200).json({ isValid: true, studentDetails: JSON.parse(data) }); // Parsing the data assuming it's a JSON string
      } else {
        res.status(200).json({ isValid: false });
      }
    } catch (error) {
      console.error("Error verifying certificate:", error);
      res.status(500).json({ message: 'Failed to verify certificate', error: error.message });
    }
  });
  
  

  
  // router.post('/revokeCertificate/:id', async (req, res) => {
  //   const certificateId = req.params.id;
  //   try {
  //     // Create the transaction data
  //     const txData = contract.methods.revokeCertificate(certificateId).encodeABI();
  
  //     // Create the transaction object
  //     const tx = {
  //       to: contractAddress,
  //       data: txData,
  //       gas: 2000000,
  //     };
  
  //     // Sign the transaction
  //     const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  
  //     // Send the transaction
  //     const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  //     console.log(`Transaction hash: ${receipt.transactionHash}`);
  
  //     res.status(200).json({ message: 'Certificate revoked successfully', transactionHash: receipt.transactionHash });
  //   } catch (error) {
  //     console.error("Error revoking certificate:", error);
  //     res.status(500).json({ message: 'Failed to revoke certificate', error: error.message });
  //   }
  // });

  router.post('/revokeCertificate/:id', async (req, res) => {
    const certificateId = req.params.id;
    try {
        // Create the transaction data
        const txData = contract.methods.revokeCertificate(certificateId).encodeABI();

        // Get the gas price from the network
        const gasPrice = await web3.eth.getGasPrice();

        // Create the transaction object
        const tx = {
            to: contractAddress,
            data: txData,
            gas: 2000000,
            gasPrice: gasPrice,
            from: web3.eth.defaultAccount
        };

        // Sign the transaction
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

        // Send the transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log(`Transaction hash: ${receipt.transactionHash}`);

        res.status(200).json({ message: 'Certificate revoked successfully', transactionHash: receipt.transactionHash });
    } catch (error) {
        console.error("Error revoking certificate:", error);
        res.status(500).json({ message: 'Failed to revoke certificate', error: error.message });
    }
});
  
module.exports = router;
