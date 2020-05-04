const mongoose = require('mongoose');

const YogaSchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  organisation_name: {
    type: String,
    required: true,
  },
  trainee_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  // location: {
  //   type: String,
  //   required: true,
  // },

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
  about_yoga: {
    type: String,
    required: true,
  },
  google_location: {
    type: String,
    required: true,
  },
  // },

  // keyInformation: {
  type_of_yoga: {
    type: String,
    required: true,
  },
  available_days: {
    type: String,
    required: true,
  },
  min_Age: {
    type: String,
    required: true,
  },
  number_of_trainee: {
    type: String,
    required: true,
  },

  timing: {
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

module.exports = Yoga = mongoose.model('yoga', YogaSchema);
