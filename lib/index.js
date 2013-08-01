/*jshint evil: false, bitwise:false, strict: false, undef: true, white: false, plusplus:false, node:true */

function getFunctionArgumentNames(func) {
    var funStr = func.toString();
    return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
}

module.exports = function(fn, argsMap, thisArg) {
	var argumentNames = getFunctionArgumentNames(fn) || [];
	var args = argumentNames.map(function(a) {
		var value = argsMap[a];
		if(typeof value === 'undefined') {
			throw new Error('value for argument ' + a + ' not passed');
		}
		return value;
	});
	return fn.apply(thisArg, args);
};