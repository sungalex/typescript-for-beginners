// Block Structure
class Block {
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

// create Block instance
const genesisBlock: Block = new Block(
  0,
  '20210825032112345',
  '',
  'Hello',
  Date.now()
);

// create blockchain as Block Array Type
let blockchain: [Block] = [genesisBlock];

console.log(blockchain);

export {};
