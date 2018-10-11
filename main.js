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