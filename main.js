const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timestamp,data,previousHash=''){
        /*index:this optional show where the block in the chain
        timestamp:when the blcok is created
        data:any kind of data in the block like transaction details
        previousHash:contain the hash of block before this one
        */
       this.index=index;
       this.timestamp=timestamp;
       this.data=data;
       this.previousHash=previousHash;
       this.hash=this.calculateHash();//hash after calculation
    }
    calculateHash(){//this hash will helpful to identify block in the blockchain
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
    }

}

//create blochchain class
class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
    }
    //first block in the chain called genesisBlock
    createGenesisBlock(){
        return new Block(0,"11-10-2018","GenesisBlock",0);//starter block
    }
    getLatestBlock(){
        //for return most recently created block
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        //for add new block into the chain
        newBlock.previousHash=this.getLatestBlock().hash;//get the hash value of previous block
        newBlock.hash=newBlock.calculateHash();//calculate hash using data and previous block hash value
        this.chain.push(newBlock);//add hash to the array
    }
}