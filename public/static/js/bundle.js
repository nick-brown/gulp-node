(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(exponent) {
    return function(number) {
        return Math.pow(number, exponent);
    };
};

},{}],2:[function(require,module,exports){
var power = require("./lib/power");

var pow10 = power(10);

var arr = [4, 32, 56, 100, 230];

console.log(arr.map(pow10));

},{"./lib/power":1}]},{},[2])