const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data));
    }
}
class Blockchain{
/**The constructor is responsible for initializing our blockchain */
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "12/3/2020", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let mylesCoin = new Blockchain();
mylesCoin.addBlock(new Block(1,"12/3/2020", {amount: 1}));
mylesCoin.addBlock(new Block(2,"12/3/2020", {amount: 5}));
mylesCoin.addBlock(new Block(3,"12/3/2020", {amount: 23}));

console.log("Is blockchain valid? " + mylesCoin.isChainValid());

// mylesCoin.chain[1].data = {amount: 100};
// mylesCoin.chain[1].hash = mylesCoin.chain[1].calculateHash();


// console.log("Is blockchain valid? " + mylesCoin.isChainValid());


// console.log(JSON.stringify(mylesCoin, null, 4));