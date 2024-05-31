require('dotenv').config();
const Web3 = require('web3');

const infuraProjectId = process.env.INFURA_PROJECT_ID;
const privateKey = process.env.PRIVATE_KEY;

const web3 = new Web3(`https://rinkeby.infura.io/v3/${infuraProjectId}`);

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

const myAddress = account.address;
const recipientAddress = 'recipient_ethereum_address_here';  // Replace with actual recipient address

// Get balance function
async function getBalance(address) {
  const balance = await web3.eth.getBalance(address);
  console.log(`Balance of ${address}: ${web3.utils.fromWei(balance, 'ether')} ETH`);
}

// Send transaction function
async function sendTransaction() {
  const tx = {
    from: myAddress,
    to: recipientAddress,
    value: web3.utils.toWei('0.01', 'ether'),
    gas: 2000000,
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log('Transaction receipt:', receipt);
}

// Main function
async function main() {
  await getBalance(myAddress);
  await getBalance(recipientAddress);

  console.log('Sending transaction...');
  await sendTransaction();

  await getBalance(myAddress);
  await getBalance(recipientAddress);
}

main().catch((error) => {
  console.error('Error in main function:', error);
});
