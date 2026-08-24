const { authenticator } = require('@root/middleware');
const { getAllSettings, editSettings } = require('@root/controllers');
const router = require('express').Router();

router.get('/', authenticator, getAllSettings)
router.patch('/', authenticator, editSettings)
module.exports = router;