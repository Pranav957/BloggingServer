const express = require('express');
const router = express.Router();

router.use('/blogs', require('./blogs'));
router.use('/users', require('./users'));

module.exports = router;