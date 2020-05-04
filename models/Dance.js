const mongoose = require('mongoose');

const DanceSchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  dance_schoolName: {
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
  about_school: {
    type: String,
    required: true,
  },
  google_location: {
    type: String,
    required: true,
  },
  // },

  // keyInformation: {
  dance_style: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  number_of_trainee: {
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

module.exports = Dance = mongoose.model('dance', DanceSchema);
