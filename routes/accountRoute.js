const { authenticator } = require('@root/middleware');
const { getAllSettings, editSettings, uploadPFP, removePFP, getPFP } = require('@root/controllers');

const router = require('express').Router();
router.get('/pfp', authenticator, getPFP)
router.put('/pfp', authenticator, uploadPFP)
router.delete('/pfp', authenticator, removePFP)
module.exports = router;


router.get('/settings', authenticator, getAllSettings)
router.patch('/settings', authenticator, editSettings)
module.exports = router;