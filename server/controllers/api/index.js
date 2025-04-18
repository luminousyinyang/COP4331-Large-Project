const router = require('express').Router();
const home = require('./homeController');
const item = require('./itemController');
const authController = require('./authController');

//test route
router.use('/', home);
router.use('/item', item);
router.use('/auth', authController);
module.exports = router;
