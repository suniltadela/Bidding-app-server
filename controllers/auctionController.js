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
// Update an auction
exports.updateAuction = async (req, res) => {
  const { id } = req.params;
  // Destructure properties from req.body
  const { title, description, startingBid, endDate } = req.body;
  try {
    const auction = await Auction.findByIdAndUpdate(id, {
      title,
      description,
      startingBid,
      endDate,
    }, { new: true }); // Return the updated auction

    if (!auction) {
      return res.status(404).send('Auction not found');
    }

    res.json({ auction, msg: "Auction updated successfully" });
  } catch (err) {
    console.error('Error updating auction:', err);
    res.status(500).send('Server error');
  }
};

// Update current bid of an auction
exports.updateCurrentBid = async (req, res) => {
  const { id } = req.params;
  const { currentBid } = req.body;

  try {
    // Find the auction by ID and update the current bid
    const auction = await Auction.findByIdAndUpdate(
      id,
      { currentBid },
      { new: true } // Return the updated auction
    );

    if (!auction) {
      return res.status(404).send('Auction not found');
    }

    res.json({ auction, msg: "Bid updated successfully" });
  } catch (err) {
    res.status(500).send('Server error');
  }
};




// Delete an auction
exports.deleteAuction = async (req, res) => {
  const { id } = req.params;

  try {
    const auction = await Auction.findByIdAndDelete(id);

    if (!auction) {
      return res.status(404).send('Auction not found');
    }

    res.json({ msg: "Auction deleted successfully" });
  } catch (err) {
    res.status(500).send('Server error');
  }
};



// Get auctions by user ID
exports.getAuctionsByUserId = async (req, res) => {
  const userId = req.params.id;

  try {
    const auctions = await Auction.find({ creator: userId }).populate('creator', 'name'); // Find auctions by user

    // Check if auctions exist
    if (auctions.length === 0) {
      return res.status(404).json({ message: 'No auctions created for this user.' });
    }

    res.json(auctions); // Send auctions back to the client
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send('Server error');
  }
};


