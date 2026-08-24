const { BadRequest, Unauthorized } = require("@root/errors");
const { RP, User } = require('@root/models');
const { StatusCodes } = require('http-status-codes');
const { createTransporter, hashString, generateHex, emailVerification } = require("@root/utils");
const bcrypt = require('bcrypt');
const { attachAuthCookies, removeAccessCookie } = require("../utils/cookies");
const { passwordReset } = require("../utils/emails");
const { isFutureDate } = require("../utils/date");
const { minute } = require("../utils/time");
const { RT } = require("../models");
// controllers
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequest('Invalid Credentials');
    const user = await User.findOne({ email });
    if (!user) throw new Unauthorized('Invalid Email or Password');
    if (!user.isVerified) throw new Unauthorized('Please verify your Email address before logging in')
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        await attachAuthCookies(req, res, { id: user._id, fullname: user.fullname });
        return res.status(StatusCodes.OK).json({ message: 'Logged in succesfully' });
    } else throw new Unauthorized('Invalid Email or Password');
}
const logout = async (req, res) => {
    const { id } = req.user;
    await RT.deleteOne({ id });
    removeAccessCookie(res);
    res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
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
    if (user.isVerified) throw new BadRequest("Email already verified");
    const verificationToken = hashString(token);
    if (verificationToken !== user.verificationToken) throw new BadRequest('Invalid verification request');

    user.isVerified = true;
    user.verificationToken = "none";
    await user.save();
    await attachAuthCookies(req, res, { id: user._id, fullname: user.fullname });
    return res.status(StatusCodes.OK).json({ message: 'Email verified successfully' });
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) throw new BadRequest('Email must be provided');

    const user = await User.findOne({ email });
    if (!user) throw new BadRequest('Invalid credintials');

    const resetToken = generateHex(32);
    const hashedResetToken = hashString(resetToken);
    const existingRPrequest = await RP.findOne({ userId: user._id });
    if (existingRPrequest) {// replace existing request
        existingRPrequest.resetToken = hashedResetToken;
        existingRPrequest.expiresAt = new Date(Date.now() + 15 * minute);
        existingRPrequest.isRevoked = false;
        await existingRPrequest.save();
    } else {// create a new request if there is no exisitng one
        await RP.create({ userId: user._id, resetToken: hashedResetToken });
    }
    await sendResetEmail(user.email, resetToken);
    res.status(StatusCodes.OK).json({ message: 'Reset email sent' });
}
const resetPassword = async (req, res) => {
    const { email, resetToken, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new BadRequest('Invalid Credintials');

    const resetRequest = await RP.findOne({ userId: user._id });
    if (!resetRequest || resetRequest.isRevoked) throw new BadRequest('Please click on "forgot passsword" before trying to reset password');

    const hashedResetToken = hashString(resetToken);
    if (!isFutureDate(resetRequest.expiresAt)) throw new BadRequest('request expired');
    if (hashedResetToken !== resetRequest.resetToken) throw new BadRequest('invalid Credintials');
    user.password = newPassword;
    await user.save();
    resetRequest.isRevoked = true;
    resetRequest.resetToken = 'none';
    await resetRequest.save();
    res.status(StatusCodes.OK).json({ message: 'password resetted' });
}

// helper functions
const sendVerificationEmail = async (to, verificationToken) => {
    const verificationUrl = `${process.env.APP_URL}/auth/verify-email?email=${to}&token=${verificationToken}`
    const transporter = createTransporter();
    const mail = emailVerification({ from: 'domores@wdata.app', to, verificationUrl });
    await transporter.sendMail(mail);
}
const sendResetEmail = async (to, resetToken) => {
    const resetUrl = `${process.env.APP_URL}/auth/reset-password?email=${to}&token=${resetToken}`
    const transporter = createTransporter();
    const mail = passwordReset({ from: 'domores@wdata.app', to, resetUrl });
    await transporter.sendMail(mail);
}

module.exports = { login, logout, register, verifyEmail, resetPassword, forgotPassword }