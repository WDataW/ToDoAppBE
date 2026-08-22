const { verifyJWT, attachAccessCookie } = require("@root/utils");
const { Unauthorized } = require("../errors");
const { RT } = require("../models");

const authenticator = async (req, res, next) => {
    const { accessToken } = req.signedCookies;
    let payload;
    if (!accessToken) {
        payload = await checkRefreshToken(req, res);
    } else {
        payload = verifyJWT(accessToken);
        if (!payload) payload = await checkRefreshToken(req, res);
    }
    if (!payload) throw new Unauthorized('Please log in first');
    req.user = payload;
    next();
}

const checkRefreshToken = async (req, res) => {
    const { refreshToken } = req.signedCookies;
    if (!refreshToken) return;

    // provided credintials
    const { userId, sessionId, fullname } = verifyJWT(refreshToken);
    const storedToken = await RT.findOne({ userId: userId });
    if (!storedToken || storedToken.isRevoked) return;
    const { ip } = req;
    const userAgent = req.get('User-Agent');

    // stored credintials
    const { sessionId: storedSesstionId, ip: storedIp, userAgent: storedUserAgent, refreshToken: storedRefreshToken } = storedToken;
    // verification
    if (storedRefreshToken == refreshToken &&
        sessionId == storedSesstionId &&
        ip == storedIp &&
        userAgent == storedUserAgent
    ) {
        // refreshing access token
        attachAccessCookie(res, { id: userId, fullname });
        return { id: userId, fullname };
    } else {
        storedToken.isRevoked = true;
        storedToken.save();
    }
    return null;
}
module.exports = authenticator;