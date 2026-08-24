const { authenticator } = require('@root/middleware');
const { getAllTags, createTag, getTag, editTag, deleteTag } = require('@root/controllers');

const router = require('express').Router();

router.get('/', authenticator, getAllTags)
router.put('/create-tag', authenticator, createTag)
router.get('/:tagId', authenticator, getTag)
router.patch('/edit-tag/:tagId', authenticator, editTag)
router.delete('/delete-tag/:tagId', authenticator, deleteTag)
module.exports = router;