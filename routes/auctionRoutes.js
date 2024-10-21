const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAuctionsByUserId } = require('../controllers/auctionController');
// Get all auctions
router.get('/', auctionController.getAuctions);

// Create a new auction (Protected Route)
//later middleware will be passed authMiddleware,
router.post('/',authMiddleware, auctionController.createAuction);
router.get('/user/:id', authMiddleware, auctionController.getAuctionsByUserId);
// Update auction
router.put('/:id',authMiddleware, auctionController.updateAuction);

// Delete auction
router.delete('/:id',authMiddleware, auctionController.deleteAuction);

router.patch('/:id',authMiddleware, auctionController.updateCurrentBid);

// router.get('/user/:id', getAuctionsByUserId); // Adjust the route for fetching auctions by user ID

module.exports = router;
