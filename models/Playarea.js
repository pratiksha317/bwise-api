const mongoose = require('mongoose');

const PlayareaSchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  name: {
    type: String,
    required: true,
  },
  organisation_name: {
    type: String,
    required: true,
  },
  age_group: {
    type: String,
  },
  entry_fee: {
    type: String,
    required: true,
  },
  weekday_rate: {
    type: String,
    required: true,
  },
  weekend_rate: {
    type: String,
    required: true,
  },
  offers: {
    type: String,
    required: true,
  },
  facilities: {
    type: String,
  },
  bonus_features: {
    type: String,
  },
  packages: {
    type: String,
    required: true,
  },
  book_requirements: {
    type: String,
  },
  food: {
    type: String,
  },
  music: {
    type: String,
  },
  screen: {
    type: String,
  },
  kids_friendly: {
    type: String,
  },
  products_and_service_offered: {
    type: String,
  },
  brances: {
    type: String,
  },

  state: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pin_code: {
    type: String,
    required: true,
  },

  phone_number: {
    type: String,
    required: true,
  },
  landline_number: {
    type: String,
    required: true,
  },

  images: [
    {
      images: {
        type: String,
        required: true,
      },
    },
  ],
  address: {
    type: String,
    required: true,
  },
});

module.exports = Playarea = mongoose.model('playarea', PlayareaSchema);
