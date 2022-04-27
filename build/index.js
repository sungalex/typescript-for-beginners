"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class Block {
    constructor(index, timestamp, prevHash, data) {
        this.index = index;
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.data = data;
        this.hash = Block.calculateHash(index, timestamp, prevHash, data);
    }
    static calculateHash(index, timestamp, prevHash, data) {
        const toHash = `${index}${timestamp}${prevHash}${data}`;
        return crypto_1.default.createHash("sha256").update(toHash).digest("hex");
    }
}
Block.validateStructure = (block) => typeof block.index === "number" &&
    typeof block.timestamp === "number" &&
    typeof block.prevHash === "string" &&
    typeof block.data === "string" &&
    typeof block.hash === "string";
class Blockchain {
    constructor() {
        this.blocks = [];
    }
    getLatestBlock() {
        return this.blocks[this.blocks.length - 1];
    }
    getPrevHash() {
        if (this.blocks.length === 0)
            return "";
        return this.getLatestBlock().hash;
    }
    addBlock(data) {
        const newBlock = new Block(this.blocks.length, getNewTimestamp(), this.getPrevHash(), data);
        if (Block.validateStructure(newBlock)) {
            this.blocks.push(newBlock);
        }
        else {
            console.log("Block Structure is invalid.");
        }
    }
    getBlocks() {
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
