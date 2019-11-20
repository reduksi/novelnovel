const crypto = require('crypto');

function password(secret,pass){
    const hash = crypto.createHmac('sha256', secret)
                   .update(pass)
                   .digest('hex');
    return hash
}

module.exports = password