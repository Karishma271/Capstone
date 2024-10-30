const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex'); // Generates a 256-bit key
console.log(secretKey);
