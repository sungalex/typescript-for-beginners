import crypto from "crypto";

interface BlockShape {
  index: number;
  timestamp: number;
  prevHash: string;
  data: string;
  hash: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public index: number,
    public timestamp: number,
    public prevHash: string,
    public data: string
  ) {
    this.hash = Block.calculateHash(index, timestamp, prevHash, data);
  }
  static calculateHash(
    index: number,
    timestamp: number,
    prevHash: string,
    data: string
  ) {
    const toHash = `${index}${timestamp}${prevHash}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
  static validateStructure = (block: Block): boolean =>
    typeof block.index === "number" &&
    typeof block.timestamp === "number" &&
    typeof block.prevHash === "string" &&
    typeof block.data === "string" &&
    typeof block.hash === "string";
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getLatestBlock() {
    return this.blocks[this.blocks.length - 1];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.getLatestBlock().hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.blocks.length,
      getNewTimestamp(),
      this.getPrevHash(),
      data
    );
    if (Block.validateStructure(newBlock)) {
      this.blocks.push(newBlock);
    } else {
      console.log("Block Structure is invalid.");
    }
  }
  public getBlocks() {
    return [...this.blocks];
  }
}

const getNewTimestamp = () => new Date().getTime();

const blockchain = new Blockchain();
blockchain.addBlock("First Block");
blockchain.addBlock("Second Block");
blockchain.addBlock("Third Block");
blockchain.addBlock("Fourth Block");

console.log(blockchain.getBlocks());

export {};
