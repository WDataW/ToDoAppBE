const JWT = require('jsonwebtoken');

const signJWT = (payload) => {
    return JWT.sign(payload, process.env.JWT_SECRET);
}

const verifyJWT = (token) => {
    return JWT.verify(token, process.env.JWT_SECRET);
}
module.exports = { signJWT, verifyJWT }