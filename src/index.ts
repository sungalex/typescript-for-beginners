import * as CryptoJS from 'crypto-js';

// Block Structure
class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    data: string,
    timestamp: number
  ): string =>
    CryptoJS.SHA256(index + previousHash + data + timestamp).toString();

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

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

// Create first Block instance
const genesisBlock: Block = new Block(
  0,
  Block.calculateBlockHash(0, '', 'First Block', getNewTimestamp()),
  '',
  'First Block',
  getNewTimestamp()
);

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
  return newBlock;
};

blockchain.push(createNewBlock('hello'));
blockchain.push(createNewBlock('bye bye'));
console.log(blockchain);

const getBlockchain = (): Block[] => blockchain;

export {};
