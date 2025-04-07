const router = require('express').Router();
const apiRoutes = require('./api'); // Import API routes
const authController = require('./authController')

router.use('/api', apiRoutes);
router.use('/auth', authController);

module.exports = router;
