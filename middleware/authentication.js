const { verifyJWT } = require("@root/utils");
const { Unauthorized } = require("../errors");

const authenticator = async (req, res, next) => {
    const { accessToken } = req.signedCookies;
    if (!accessToken) throw new Unauthorized('Please log in first');
    const payload = verifyJWT(accessToken);
    if (!payload) throw new Unauthorized('Please log in first');

    const { fullname, id } = payload;
    req.user = { fullname, id }
    next();
}
module.exports = authenticator;