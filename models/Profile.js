const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  schoolName: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },

  keyInformation: [
    {
      schoolType: {
        type: String,
        required: true,
      },
      afflication: {
        type: String,
        required: true,
      },
      grade: {
        type: String,
        required: true,
      },
      minAge: {
        type: String,
        required: true,
      },
      instructionLang: {
        type: String,
        required: true,
      },
      establishmentYear: {
        type: String,
        required: true,
      },
    },
  ],
  feeStructure: [
    {
      totalFees: {
        type: String,
        required: true,
      },
      admissionfees: {
        type: String,
        required: true,
      },
      otherFees: {
        type: String,
        required: true,
      },
    },
  ],
  amenities: {
    amenitiesOne: {
      type: String,
    },
    amenitiesTwo: {
      type: String,
    },
    amenitiesThree: {
      type: String,
    },
    amenitiesfour: {
      type: String,
    },
    amenitiesFive: {
      type: String,
    },
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
