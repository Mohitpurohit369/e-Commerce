
const mongoose = require('mongoose');

const logoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Logo = mongoose.model('Logo', logoSchema);

module.exports = Logo;
