const { updateFullname, getAllSettings, editSettings, uploadPFP, removePFP, getPFP } = require('@root/controllers');

const router = require('express').Router();
router.get('/pfp', getPFP)
router.post('/pfp', uploadPFP)
router.delete('/pfp', removePFP)
module.exports = router;


router.get('/settings', getAllSettings)
router.patch('/settings', editSettings)
router.patch('/name', updateFullname)
module.exports = router;