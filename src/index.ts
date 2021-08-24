import * as CryptoJS from 'crypto-js';

// Block Structure
class Block {
  // instance 생성 없이 class name으로 바로 접근 가능한 static method
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    data: string,
    timestamp: number
  ): string =>
    CryptoJS.SHA256(index + previousHash + data + timestamp).toString();

  static validateStructure = (block: Block): boolean =>
    typeof block.index === 'number' &&
    typeof block.hash === 'string' &&
    typeof block.previousHash === 'string' &&
    typeof block.data === 'string' &&
    typeof block.timestamp === 'number';

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

// Timestamp and Hash
const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);
const getHashForBlock = (block: Block): string =>
  Block.calculateBlockHash(
    block.index,
    block.previousHash,
    block.data,
    block.timestamp
  );

// Create first Block instance
const genesisBlock: Block = new Block(
  0,
  Block.calculateBlockHash(0, '', 'First Block', getNewTimestamp()),
  '',
  'First Block',
  getNewTimestamp()
);

// blockchain Array and creating Block
let blockchain: Block[] = [genesisBlock];
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimestamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    data,
    newTimestamp
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);
  return newBlock;
};

// Validate Block
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (candidateBlock.index !== previousBlock.index + 1) {
    return false;
  } else if (candidateBlock.previousHash !== previousBlock.hash) {
    return false;
  } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock('Second Block');
createNewBlock('Third Block');
createNewBlock('Fourth Block');

const getBlockchain = (): Block[] => blockchain;

console.log(getBlockchain());

export {};
