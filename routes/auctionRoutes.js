const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get all auctions
router.get('/', auctionController.getAuctions);

// Create a new auction (Protected Route)
//later middleware will be passed authMiddleware,
router.post('/',authMiddleware, auctionController.createAuction);

module.exports = router;
