const express = require('express');

// back in our API router
const router = express.Router();
const { user } = require('../../middleware/user.middleware');

const productRoutes = require('../api/v1/products.routes');

router.use('/products',user, productRoutes);

/* GET home page. */
router.get('/', function(req, res) {
    res.json({
        status: 'success',
        message: 'Product Service API',
        data: { version_number: 'v1.0.0' }
    });
});

module.exports = router;
