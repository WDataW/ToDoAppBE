const { authenticator } = require('@root/middleware');

const router = require('express').Router();

router.get('/all', authenticator, async (req, res) => {
    res.status(200).json({ message: 'OK', ...req.user });
});
module.exports = router;