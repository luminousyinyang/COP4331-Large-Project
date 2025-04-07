const router = require('express').Router();
const mongoTestRoute = require('./mongoTestRoute'); // Import your route file

// Prefix '/api' for all routes in this file
router.use('/mongotest', mongoTestRoute);  // Now the route will be accessible at /api/yourroute/test

module.exports = router;
