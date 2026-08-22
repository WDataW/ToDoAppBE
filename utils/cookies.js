const attachCookie = async ({ res, name, value, expires }) => {
    res.cookie(name, value, {
        httpOnly: true,
        expires: expires,
        signed: true,
        secure: process.env.NODE_ENV == 'production'
    })
}

module.exports = { attachCookie }