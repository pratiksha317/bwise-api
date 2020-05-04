const mongoose = require('mongoose');

const SportsSchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  owner_name: {
    type: String,
    required: true,
  },
  academy_name: {
    type: String,
    required: true,
  },
  game_type: {
    type: String,
    required: true,
  },
  // addressInformation: {
  email_id: {
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
  fax_number: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  about_sports: {
    type: String,
    required: true,
  },
  google_location: {
    type: String,
    required: true,
  },
  // },

  // keyInformation: {
  sports: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  number_of_coach: {
    type: String,
    required: true,
  },

  timing: {
    type: String,
  },
  establishment_Year: {
    type: String,
    required: true,
  },

  avg_anual_fee: {
    type: String,
    required: true,
  },
  addmission_fee: {
    type: String,
    required: true,
  },
  is_refundable: {
    type: Boolean,
    default: false,
  },
  // },

  gallery: [
    {
      images: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = Sports = mongoose.model('sports', SportsSchema);
