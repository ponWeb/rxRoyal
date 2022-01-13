"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const Seq = require("sequin");
const DEFAULT_BITS = 128;
const DEFAULT_RADIX = 16;
const DIGITS = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
function default_1(bits, radix) {
    bits = bits || DEFAULT_BITS;
    radix = radix || DEFAULT_RADIX;
    if (radix < 2 || radix > 36)
        throw new Error('radix argument must be between 2 and 36');
    let length = Math.ceil(bits * Math.log(2) / Math.log(radix)), entropy = (0, crypto_1.randomBytes)(bits), stream = new Seq(entropy), string = '';
    while (string.length < length)
        string += DIGITS[stream.generate(radix)];
    return string;
}
exports.default = default_1;
;
//# sourceMappingURL=csprng.js.map