
```markdown
# Web3 Sample Project

This project demonstrates how to interact with the Ethereum blockchain using Node.js and the `web3.js` library. The project includes functionality to get the balance of an Ethereum address and to send a transaction.

## Prerequisites

- Node.js installed on your machine.
- An Ethereum wallet with some test Ether (e.g., from the Rinkeby test network).
- Infura account for accessing Ethereum nodes.

## Installation

1. Clone the repository or download the project files.
2. Navigate to the project directory.

   ```bash
   cd web3-sample-project
   ```

3. Install the required dependencies.

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory of the project and add your Infura project ID and Ethereum private key.

   ```plaintext
   INFURA_PROJECT_ID=your_infura_project_id
   PRIVATE_KEY=your_ethereum_private_key
   ```

## Usage

1. Open the `index.js` file and replace the placeholder `recipient_ethereum_address_here` with the actual recipient address.

2. Run the project.

   ```bash
   node index.js
   ```

## Code Overview

### Environment Variables

- `INFURA_PROJECT_ID`: Your Infura project ID.
- `PRIVATE_KEY`: Your Ethereum private key.

### Web3 Initialization

We initialize a `Web3` instance using an Infura endpoint for the Rinkeby test network.

```javascript
const web3 = new Web3(`https://rinkeby.infura.io/v3/${infuraProjectId}`);
```

### Account Setup

We convert our private key to an account object and add it to the web3 wallet.

```javascript
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
```

### Get Balance

The `getBalance` function retrieves and logs the Ether balance of a given address.

```javascript
async function getBalance(address) {
  const balance = await web3.eth.getBalance(address);
  console.log(`Balance of ${address}: ${web3.utils.fromWei(balance, 'ether')} ETH`);
}
```

### Send Transaction

The `sendTransaction` function creates and sends a transaction from our address to a recipient address.

```javascript
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
```

### Main Function

The `main` function orchestrates getting balances before and after sending a transaction.

```javascript
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
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```