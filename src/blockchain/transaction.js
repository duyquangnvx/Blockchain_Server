
const cc = require("../base/CCClass");
let Transaction = cc.Class.extend({
    fromAddress: null,
    toAddress: null,
    amount: null,

    ctor: function (fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
})

module.exports = Transaction;