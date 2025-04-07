const router = require('express').Router();
const home = require('./homeController');
//test route
router.use('/', home);

module.exports = router;
