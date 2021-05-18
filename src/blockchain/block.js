const SHA256 = require('crypto-js/sha256');
const cc = require("../base/CCClass");

let Block = cc.Class.extend({
    timestamp: null,
    transactions: null,
    previousHash: null,
    hash: null,
    nonce: 0,

    ctor: function (timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    },

    calculateHash: function () {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    },

    mineBlock: function (difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }

})

module.exports = Block;