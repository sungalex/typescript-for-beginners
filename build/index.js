"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
// Block Structure
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
// instance 생성 없이 class name으로 바로 접근 가능한 static method
Block.calculateBlockHash = (index, previousHash, data, timestamp) => CryptoJS.SHA256(index + previousHash + data + timestamp).toString();
Block.validateStructure = (block) => typeof block.index === 'number' &&
    typeof block.hash === 'string' &&
    typeof block.previousHash === 'string' &&
    typeof block.data === 'string' &&
    typeof block.timestamp === 'number';
// Timestamp and Hash
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
const getHashForBlock = (block) => Block.calculateBlockHash(block.index, block.previousHash, block.data, block.timestamp);
// Create first Block instance
const genesisBlock = new Block(0, Block.calculateBlockHash(0, '', 'First Block', getNewTimestamp()), '', 'First Block', getNewTimestamp());
// blockchain Array and creating Block
let blockchain = [genesisBlock];
const getLatestBlock = () => blockchain[blockchain.length - 1];
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimestamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, data, newTimestamp);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
// Validate Block
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (candidateBlock.index !== previousBlock.index + 1) {
        return false;
    }
    else if (candidateBlock.previousHash !== previousBlock.hash) {
        return false;
    }
    else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock('Second Block');
createNewBlock('Third Block');
createNewBlock('Fourth Block');
const getBlockchain = () => blockchain;
console.log(getBlockchain());
