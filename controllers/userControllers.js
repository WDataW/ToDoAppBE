const { StatusCodes } = require("http-status-codes");
const { User } = require("../models");

const updateFullname = async (req, res) => {
    const { id: _id } = req.user;
    const { name } = req.body
    const user = await User.findOne({ _id });
    user.fullname = name;
    await user.save({ validateBeforeSave: false });
    console.log(user);
    res.status(StatusCodes.OK).json(user);
}
module.exports = { updateFullname }