const { Tag } = require('@root/models');
const { StatusCodes } = require('http-status-codes');
const checkUpdates = require('../utils/checkUpdates');
const getTag = async (req, res) => {
    const { tagId: _id } = req.params;
    const { id: userId } = req.user;
    const tag = await Tag.findOne({ _id, userId });
    if (!tag) throw new NotFound('Tag not found');

    res.status(StatusCodes.OK).json(tag);
}
const getAllTags = async (req, res) => {
    const { id: userId } = req.user;
    const tags = await Tag.find({ userId });

    res.status(StatusCodes.OK).json(tags);
}
const createTag = async (req, res) => {
    const { title, color, isHome = false } = req.body;
    if (!title || !color) throw new BadRequest('Please complete required fields');

    const { id: userId } = req.user;
    const tag = { title, color, isHome, userId };
    const mongoTag = await Tag.create(tag);
    res.status(StatusCodes.OK).json(mongoTag);
}
const editTag = async (req, res) => {
    const possibleUpdates = { title, color } = req.body;
    const { tagId } = req.params;
    const { id: userId } = req.user;
    const updates = checkUpdates(possibleUpdates);
    const editedTag = await Tag.findOneAndUpdate({ _id: tagId, userId }, updates, { returnDocument: 'after', runValidators: true, context: 'query' });
    if (!editedTag) throw new BadRequest('Tag is inexistent');
    res.status(StatusCodes.OK).json(editedTag);
}
const deleteTag = async (req, res) => {
    const { tagId } = req.params;
    const { id: userId } = req.user;
    const deletedTag = await Task.findOneAndDelete({ _id: tagId, userId });
    if (!deletedTag) return res.status(StatusCodes.OK).json({ message: "Tag already deleted" });
    res.status(StatusCodes.OK).json(deletedTag);
}


module.exports = { getTag, getAllTags, editTag, deleteTag, createTag }