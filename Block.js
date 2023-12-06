export class Block {
  constructor(index, data, hash, nonce, miningTime, difficulty) {
    this.index = index; // You may set the index when the block is added to the blockchain
    this.previousHash = null; // You may set the previousHash when the block is added to the blockchain
    this.timestamp = new Date().toISOString();
    this.data = data;
    this.hash = hash;
    this.nonce = nonce;
    this.miningTime = miningTime;
    this.difficulty = difficulty;
    this.adjustmentFactors = null; // You may set adjustmentFactors if needed
  }
}
