const cc = require("../base/CCClass");
const Transaction = require("./transaction");
const Block = require('./block');

let Blockchain = cc.Class.extend({
    chain: null,
    difficulty: null,
    pendingTransactions: null,
    miningReward: null,

    ctor: function () {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    },

    createGenesisBlock: function () {
        return new Block(0, "01/01/2021", "Genesis block", "0");
    },

    getLatestBlock: function () {
        return this.chain[this.chain.length - 1];
    },

    minePendingTransactions: function (miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        //debug('Block successfully mined!');
        this.chain.push(block);

        // reset pending transactions
        this.pendingTransactions = [];

    },

    addTransaction: function (transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw Error('Transaction must include from and to address');
        }

        if (!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to chain');
        }

        this.pendingTransactions.push(transaction);
    },

    getBalanceOfAddress: function (address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    },

    isChainValid: function () {
        for (let i = 1; i < this.chain.length; i++) {
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if (currBlock.hasValidTransaction()) {
                return false;
            }

            if (currBlock.hash !== currBlock.calculateHash()) {
                return false;
            }

            if (currBlock.previousHash !== prevBlock.hash) {
                return false;
            }
        }

        return true;
    }
});

module.exports = Blockchain;

