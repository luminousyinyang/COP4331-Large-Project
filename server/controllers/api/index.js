const router = require('express').Router();
const home = require('./homeController');
const item = require('./itemController');

//test route
router.use('/', home);
router.use('/item', item);
module.exports = router;
