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
    if (!refreshToken) throw new Unauthorized('Please log in first');
    // provided credintials
    const { id, sessionId, fullname } = verifyJWT(refreshToken);
    const storedToken = await RT.findOne({ userId: id });

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
        attachAccessCookie(res, { id, fullname });
        return { id, fullname };
    } else {
        storedToken.isRevoked = true;
        storedToken.save();
    }
    return null;// failed to refresh access token
}
module.exports = authenticator;