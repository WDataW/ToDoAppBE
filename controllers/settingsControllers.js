const { StatusCodes } = require("http-status-codes");
const { Settings } = require("../models");
const checkUpdates = require("../utils/checkUpdates");

const getAllSettings = async (req, res) => {
    const { id: userId } = req.user;
    const settings = await Settings.findOne({ userId });
    res.status(StatusCodes.OK).json(settings);
}
const editSettings = async (req, res) => {
    const { id: userId } = req.user;
    const possibleUpdates = { title, color, isHome } = req.body;
    const updates = checkUpdates(possibleUpdates);
    const settings = await Settings.findOneAndUpdate({ userId }, updates, { returnDocument: 'after', runValidators: true, context: 'query' });
    res.status(StatusCodes.OK).json(settings);
}
const initSettings = (userId) => {
    return Settings.create({ userId });
}


module.exports = { getAllSettings, initSettings, editSettings }