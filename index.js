import { Blockchain } from "./Blockchain";

// Example usage
const blockchain = new Blockchain();

for (let i = 0; i < 100; i++) {
  blockchain.mineBlock("Block " + i);
}

// Display the blockchain
//console.log(JSON.stringify(blockchain, null, 2));
