const SHA256 = require('crypto-js/sha256');
const cc = require("../base/CCClass");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


let Transaction = cc.Class.extend({
    fromAddress: null,
    toAddress: null,
    amount: null,

    ctor: function (fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    },

    calculateHash: function () {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    },

    signTransaction: function (singingKey) {
        if (singingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transactions for other wallets!');
        }

        const hashTx = this.calculateHash();
        const sig = singingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    },

    isValid: function () {
        if (this.fromAddress === null) {
            return false;
        }

        if (!this.signature || this.signature.length === 0) {
            throw new Error('No signature in this transaction');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
})

module.exports = Transaction;