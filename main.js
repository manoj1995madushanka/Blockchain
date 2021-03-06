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
       this.nonce=0;//random number, this will increment with number of zeroes in the hash
    }
    calculateHash(){//this hash will helpful to identify block in the blockchain
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
        //stringify converts the JS value to JS object notation
    }

    //add certain amount of zeroes into the front of the block
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty)!==Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash=this.calculateHash();
        }
        console.log("Block mined : "+this.hash);

    }

}

//create blochchain class
class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty=2;//set dificulty value
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
        //newBlock.hash=newBlock.calculateHash();//calculate hash using data and previous block hash value
        newBlock.mineBlock(this.difficulty);/*pass mine block with dificulty value this take long time to generate new block 
        according to difficulty value*/
        this.chain.push(newBlock);//add hash to the array
    }

    //for verify the integrity
    isChainValid(){
        for(let i=1;i<this.chain.length;i++){
            //i=1 because o is the genesis block
            const currentBlock=this.chain[i];
            const previousBlock=this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            return true;//valid chain
        }
    }
}

let forCheck=new Blockchain();
console.log("mining block 1: ");
forCheck.addBlock(new Block(1,"12-10-2018",{amount : 4}));

console.log("mining block 2: ");
forCheck.addBlock(new Block(2,"12-10-2018",{amount : 10}));

//console.log(JSON.stringify(forCheck,null,4));
//check validity
/*console.log ("Is blockchain valid : "+forCheck.isChainValid());

forCheck.chain[1].data={amount:100};
console.log ("Is blockchain valid : "+forCheck.isChainValid());*/
