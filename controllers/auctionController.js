const Auction = require('../models/Auction');

// Get all auctions
exports.getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find().populate('creator', 'name');
    res.json(auctions);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Create a new auction
exports.createAuction = async (req, res) => {
  const { title, description, startingBid, endDate } = req.body;

  try {
    const auction = new Auction({
      title,
      description,
      startingBid,
      endDate,
      creator: req.user.id,
    });

    await auction.save();
    res.json({ auction, msg: "auction created successfully" });
  } catch (err) {
    res.status(500).send('Server error');
  }
};



// Get auctions by user ID
exports.getAuctionsByUserId = async (req, res) => {
  const userId = req.params.id;

  try {
    const auctions = await Auction.find({ creator: userId }).populate('creator', 'name'); // Find auctions by user
    res.json(auctions); // Send auctions back to the client
  } catch (err) {
    res.status(500).send('Server error');
  }
};

