const mongoose = require('mongoose');

const VenderSchema = new mongoose.Schema({
  organisation_name: {
    type: String,
    required: true,
  },
  owner_name: {
    type: String,
    required: true,
  },
  organisation_register_number: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  organisation_type: {
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
  pin_code: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  our_packages: [
    {
      our_packages: {
        type: String,
        required: true,
      },

      payment_mode: {
        type: String,
        required: true,
      },
    },
  ],

  upload: [
    {
      upload_cheque: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = Vender = mongoose.model('vender', VenderSchema);
