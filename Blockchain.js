import { Block } from "./Block";
import * as Bun from "bun";

export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5; // Initial difficulty level (number of leading zeros)
    console.log(this.difficulty);
  }

  createGenesisBlock() {
    return new Block(0, "0", new Date().toISOString(), "Genesis Block", "", 0);
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  mineBlock(data, verbose = false) {
    console.log("Started mining!");
    const previousBlock = this.getLastBlock();
    const index = previousBlock.index + 1;
    let nonce = 0;
    const timestamp = new Date().toISOString();
    const startTime = new Date(); // Record the start time
    let hash = "";

    do {
      nonce++;
      const hashData = `${index}${previousBlock.hash}${timestamp}${data}${nonce}`;
      const hasher = new Bun.CryptoHasher("sha1");
      hash = hasher.update(hashData).digest("hex");
    } while (!hash.startsWith("0".repeat(Math.max(0, this.difficulty)))); // Simple proof-of-work condition

    const miningTime = new Date(); // Record the end time

    const targetBlockTime = 5 * 1000;

    // Use lower values for difficulty adjustment factors
    const maxDifficultyIncreaseFactor = 1.01; // Increase by a maximum of 1%
    const maxDifficultyDecreaseFactor = 0.99; // Decrease by a maximum of 1%

    let difficultyIncreaseFactor =
      this.difficulty * maxDifficultyIncreaseFactor - this.difficulty;
    let difficultyDecreaseFactor =
      this.difficulty * maxDifficultyDecreaseFactor - this.difficulty;

    if (miningTime < targetBlockTime) {
      this.difficulty += difficultyIncreaseFactor; // Increase difficulty
      this.difficulty = Math.min(
        this.difficulty,
        this.difficulty * maxDifficultyIncreaseFactor
      );
    } else {
      this.difficulty -= difficultyDecreaseFactor; // Decrease difficulty
      this.difficulty = Math.max(
        this.difficulty,
        this.difficulty * maxDifficultyDecreaseFactor
      );
    }

    // Ensure difficulty is a positive integer
    this.difficulty = Math.max(0, this.difficulty);

    const adjustmentFactors = {
      difficultyIncreaseFactor,
      difficultyDecreaseFactor,
    };

    const newBlock = new Block(
      this.getLastBlock().index + 1,
      this.chain.length,
      this.getLastBlock().hash,
      new Date().toISOString(),
      data,
      hash,
      nonce,
      adjustmentFactors
    );

    this.chain.push(newBlock);
    console.log(
      "Found new Block id: " +
        newBlock.index +
        " in " +
        (miningTime - startTime).toString() +
        " milliseconds"
    );
    if (verbose) {
      console.log(
        `Difficulty adjusted. Increase Factor: ${difficultyIncreaseFactor}, Decrease Factor: ${difficultyDecreaseFactor}`
      );
    }
    return newBlock;
  }

  isValidBlock(block, previousBlock) {
    // Validate block integrity
    const hashData = `${block.index}${previousBlock.hash}${block.timestamp}${block.data}${block.nonce}`;
    const hasher = new Bun.CryptoHasher("sha1");
    if (block.hash !== hasher.update(hashData).digest("hex")) {
      return false;
    }

    // Validate proof-of-work
    if (!block.hash.startsWith("0000")) {
      return false;
    }

    return true;
  }

  isValidChain(chain) {
    // Validate the entire blockchain
    for (let i = 1; i < chain.length; i++) {
      if (!this.isValidBlock(chain[i], chain[i - 1])) {
        return false;
      }
    }
    return true;
  }
}
