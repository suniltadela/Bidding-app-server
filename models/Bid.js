const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  auction: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction' },
  bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bidAmount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;

