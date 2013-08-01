/*jshint evil: false, bitwise:false, strict: false, undef: true, white: false, node:true, onevar: false */

var testCase = require('nodeunit').testCase;
var callbyname = require('node_modules/callbyname/lib/index.js');

module.exports = testCase({
    'test callbyname': function(test) {
        var thiz = {};
        var result = callbyname(function(name,lastName,amount,tags) {
            test.strictEqual(name, 'Barney');
            test.strictEqual(lastName, 'Rubble');
            test.strictEqual(amount, 3.14);
            test.deepEqual(['comic', 'stoneage'], tags);
            test.strictEqual(this, thiz);
            return 5;
        }, {
            name: 'Barney',
            lastName: 'Rubble',
            tags: ['comic', 'stoneage'],
            amount: 3.14
        }, thiz);

        test.strictEqual(result, 5);
        test.done();
    },
    'test missing argument': function(test) {
        test.throws(callbyname.bind(null, function(a) {}, {b:5}), 'missing argument should throw exception');
        test.done();
    },
    'test no arguments function works': function(test) {
        var called = false;
        test.doesNotThrow(callbyname.bind(null, function() {called = true;}, {}));
        test.ok(called, 'function with no arguments should just be called');
        test.done();
    }
});