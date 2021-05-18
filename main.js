const {Block, Blockchain, Transaction } = require('./src/blockchain/index');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('156ee57e1061e42123c80a449bb2bab01249dc1dc9d052d72b610e57831e7675');
const myWalletAddress = myKey.getPublic('hex');

let savjeeCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
savjeeCoin.addTransaction(tx1);


console.log('\n Starting the miner...');
savjeeCoin.minePendingTransactions(myWalletAddress);
console.log('\nBalance of xavier is', savjeeCoin.getBalanceOfAddress(myWalletAddress));

savjeeCoin.chain[1].transactions[0].amount = 1;
console.log('\nIs chain valid?', savjeeCoin.isChainValid());

