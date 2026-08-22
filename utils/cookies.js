const { RT } = require("@root/models");
const { signJWT } = require("./jwt");
const { day, minute } = require("./time");

const attachCookie = ({ res, name, value, expires }) => {
    res.cookie(name, value, {
        httpOnly: true,
        expires: expires,
        signed: true,
        secure: process.env.NODE_ENV == 'production',
        path: '/'
    })
}

const attachAuthCookies = async (req, res, user) => {
    // creating access token (overwritten if exists)
    attachAccessCookie(res, user);

    // creating refresh token (overwritten if exists)
    const sessionId = crypto.randomUUID();
    const refreshToken = attachRefreshCookie(res, user, sessionId);

    // if there is a stored refreshToken in DB then replace it
    const { ip } = req;
    const userAgent = req.get('User-Agent');
    const existingRefreshToken = await RT.findOne({ userId: user._id });
    if (!existingRefreshToken) {
        await RT.create({ userId: user._id, sessionId, ip, userAgent, refreshToken });
    } else {
        existingRefreshToken.ip = ip;
        existingRefreshToken.userAgent = userAgent;
        existingRefreshToken.sessionId = sessionId;
        existingRefreshToken.refreshToken = refreshToken;
        await existingRefreshToken.save();
    }
}
const attachRefreshCookie = (res, user, sessionId) => {
    const refreshToken = signJWT({ id: user._id, sessionId, fullname: user.fullname }, { expiresIn: '30d' });
    attachCookie({ res, name: 'refreshToken', value: refreshToken, expires: new Date(Date.now() + 30 * day) });
    return refreshToken;
}
const attachAccessCookie = (res, user) => {
    // creating access token
    const accessToken = signJWT({ id: user._id, fullname: user.fullname }, { expiresIn: '15m' });
    attachCookie({ res, name: 'accessToken', value: accessToken, expires: new Date(Date.now() + 15 * minute) });
    return accessToken;
}
module.exports = { attachCookie, attachAccessCookie, attachAuthCookies, attachRefreshCookie }