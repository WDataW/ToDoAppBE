const { BadRequest } = require("@root/errors");
const { User } = require('@root/models');
const { StatusCodes } = require('http-status-codes');
const { createTransporter, hashString, generateHex, emailVerification } = require("@root/utils");
const login = async (req, res) => {
}
const register = async (req, res) => {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) throw new BadRequest('Invalid Credentials');

    const verificationToken = generateHex(32);
    const newUser = { fullname, email, password, verificationToken: hashString(verificationToken) };
    const mongoUser = await User.create(newUser);
    await sendVerificationEmail(email, verificationToken);
    res.status(StatusCodes.CREATED).json(verificationToken)
}

const sendVerificationEmail = async (to, verificationToken) => {
    const verificationUrl = `${process.env.APP_URL}/auth/verify-email?email=${to}&token=${verificationToken}`
    const transporter = createTransporter();
    const mail = emailVerification({ from: 'domores@wdata.app', to, verificationUrl });
    transporter.sendMail(mail);
}

const verifyEmail = async (req, res) => {
    const { email, token } = req.query;
    const user = await User.findOne({ email });
    if (!user) throw new BadRequest('Invalid verification request');

    const verificationToken = hashString(token);
    if (verificationToken !== user.verificationToken) throw new BadRequest('Invalid verification request');

    user.isVerified = true;
    user.verificationToken = "none";
    await user.save();
    res.status(StatusCodes.OK).send({})
}
module.exports = { login, register, verifyEmail }