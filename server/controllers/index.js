const router = require('express').Router();
const apiRoutes = require('./api'); // Import API routes

router.use('/api', apiRoutes);

module.exports = router;
