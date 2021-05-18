const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log('\nPrivate key', privateKey);
console.log('\nPublic key', publicKey);

// Private key 156ee57e1061e42123c80a449bb2bab01249dc1dc9d052d72b610e57831e7675
//
// Public key 04a548e021bac8a7308a804a35aa828ac23064628d690e14ff9ae7e21a9685b6a9d0c1041626f90686a99c356fb6393251f6359d2d777f8b81c68494fbbf0aa975
