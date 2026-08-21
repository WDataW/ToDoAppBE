const { BadRequest } = require("@root/errors");
const { User } = require('@root/models');
const { createTransporter, hashString, generateHex, emailVerification } = require("@root/utils");
const login = async (req, res) => {
}
const register = async (req, res) => {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) throw new BadRequest('Invalid Credentials');

    const verificationToken = generateHex(32);
    const newUser = { fullname, email, password, verificationToken };
    const mongoUser = await User.create(newUser);
    await sendVerificationEmail(email, verificationToken);
    res.status(201).json(mongoUser)
}

const sendVerificationEmail = async (to, verificationToken) => {
    const verificationUrl = `${process.env.APP_URL}/auth/verify-email?token=${verificationToken}`
    const transporter = createTransporter();
    const mail = emailVerification({ from: 'domores@wdata.app', to, verificationUrl });
    await transporter.sendMail(mail);
}
module.exports = { login, register }