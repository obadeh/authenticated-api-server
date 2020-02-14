/* eslint-disable camelcase */
const mongoose = require('mongoose');
require('./categories-schema.js');

// eslint-disable-next-line new-cap
const products = mongoose.Schema({

  category: { type: String, required: true },
  name: { type: String, required: true },
  display_name: { type: String, required: true },
  description: { type: String, required: true },

},
);


module.exports = mongoose.model('products', products);