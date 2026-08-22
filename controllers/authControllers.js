const { BadRequest, Unauthorized } = require("@root/errors");
const { User } = require('@root/models');
const { StatusCodes } = require('http-status-codes');
const { signJWT, attachCookie, minute, createTransporter, hashString, generateHex, emailVerification } = require("@root/utils");
const bcrypt = require('bcrypt');
// controllers
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequest('Invalid Credentials');
    const user = await User.findOne({ email });
    if (!user) throw new Unauthorized('Invalid Email or Password');

    if (bcrypt.compare(password, user.password)) {
        const jwt = signJWT({ id: user._id, fullname: user.fullname });
        attachCookie({ res, name: 'accessToken', value: jwt, expires: new Date(Date.now() + 15 * minute) });
        return res.status(StatusCodes.OK).json({ message: 'Logged in succesfully' });
    } else throw new Unauthorized('Invalid Email or Password');
}
const register = async (req, res) => {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) throw new BadRequest('Invalid Credentials');

    const verificationToken = generateHex(32);
    const newUser = { fullname, email, password, verificationToken: hashString(verificationToken) };
    await User.create(newUser);

    await sendVerificationEmail(email, verificationToken);
    res.status(StatusCodes.CREATED).json(verificationToken)
}

const verifyEmail = async (req, res) => {
    const { email, token } = req.query;
    const user = await User.findOne({ email });
    if (!user) throw new BadRequest('Invalid verification request');
    if (user.isVerified) {
        return res.status(StatusCodes.OK).json({ message: 'Email already verified' });
    }
    const verificationToken = hashString(token);
    if (verificationToken !== user.verificationToken) throw new BadRequest('Invalid verification request');

    user.isVerified = true;
    user.verificationToken = "none";
    await user.save();
    const jwt = signJWT({ id: user._id, fullname: user.fullname });
    attachCookie({ res, name: 'accessToken', value: jwt, expires: new Date(Date.now() + 15 * minute) });
    return res.status(StatusCodes.OK).json({ message: 'Email verified successfully' });
}


// helper functions
const sendVerificationEmail = async (to, verificationToken) => {
    const verificationUrl = `${process.env.APP_URL}/auth/verify-email?email=${to}&token=${verificationToken}`
    const transporter = createTransporter();
    const mail = emailVerification({ from: 'domores@wdata.app', to, verificationUrl });
    transporter.sendMail(mail);
}

module.exports = { login, register, verifyEmail }