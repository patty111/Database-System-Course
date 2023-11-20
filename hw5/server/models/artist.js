const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  }
}, { _id: true });

const Artist = mongoose.model('Artist', artistSchema, 'artist');

module.exports = Artist;