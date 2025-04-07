const router = require('express').Router();
const home = require('./home'); // Import your route file

//test route
router.use('/', home);

module.exports = router;
