const mongoose = require('mongoose');

const TutionSchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  owner_name: {
    type: String,
    required: true,
  },
  tution_name: {
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
  about_tution: {
    type: String,
    required: true,
  },
  google_location: {
    type: String,
    required: true,
  },
  // },

  // keyInformation: {
  subject: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  number_of_teachers: {
    type: String,
    required: true,
  },

  timing: {
    type: String,
    required: true,
  },
  instruction_lang: {
    type: String,
    required: true,
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

module.exports = Tution = mongoose.model('tution', TutionSchema);
