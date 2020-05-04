const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../../middleware/auth');
const Profile = require('../../../models/Profile');
const User = require('../../../models/User');
const { check, validationResult } = require('express-validator');

//@route GET api/profile/me
//@desc  Get User Profile
//access  Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this School' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/profile
//@desc  Create or Update User Profile
//access  Private

router.post(
  '/',
  [
    auth,
    [
      check('schoolName', 'SchoolName is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      schoolName,
      location,
      website,
      // bio,
      // skills,
      // status,
      // githubusername,
      amenitiesOne,
      amenitiesTwo,
      amenitiesThree,
      amenitiesfour,
      amenitiesFive,
    } = req.body;

    // Build Profile Object
    const profileFeilds = {};
    profileFeilds.user = req.user.id;
    if (schoolName) profileFeilds.schoolName = schoolName;
    if (website) profileFeilds.website = website;
    if (location) profileFeilds.location = location;
    // if (bio) profileFeilds.bio = bio;
    // if (status) profileFeilds.status = status;
    // if (githubusername) profileFeilds.githubusername = githubusername;
    // if (skills) {
    //   profileFeilds.skills = skills.split(',').map((skill) => skill.trim());
    // }

    //Build amenities object
    profileFeilds.amenities = {};
    if (amenitiesOne) profileFeilds.amenities.amenitiesOne = amenitiesOne;
    if (amenitiesTwo) profileFeilds.amenities.amenitiesTwo = amenitiesTwo;
    if (amenitiesThree) profileFeilds.amenities.amenitiesThree = amenitiesThree;
    if (amenitiesfour) profileFeilds.amenities.amenitiesfour = amenitiesfour;
    if (amenitiesFive) profileFeilds.amenities.amenitiesFive = amenitiesFive;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFeilds },
          { new: true }
        );

        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFeilds);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route GET api/profile
//@desc  Get all profiles
//access  Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route GET api/profile/user/user_id
//@desc  Get profile by User Id
//access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'objectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('server error');
  }
});

//@route  DELETE api/profile
//@desc   Delete profile, user and posts
//access  Private

router.delete('/', auth, async (req, res) => {
  try {
    //Delete profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //Delete user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'user deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route  PUT api/profile/keyInformation
//@desc   Add profile keyInformation
//access  Private

router.put(
  '/keyInformation',
  [
    auth,
    [
      check('schoolType', 'schoolType is required').not().isEmpty(),
      check('afflication', 'afflication is required').not().isEmpty(),
      check('grade', 'grade is required').not().isEmpty(),
      check('minAge', 'minimum age is required').not().isEmpty(),
      check('instructionLang', 'instructionLang is required').not().isEmpty(),
      check('establishmentYear', 'establishment year is required')
        .not()
        .isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      schoolType,
      afflication,
      grade,
      minAge,
      instructionLang,
      establishmentYear,
    } = req.body;

    const newExp = {
      schoolType,
      afflication,
      grade,
      minAge,
      instructionLang,
      establishmentYear,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.keyInformation.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  DELETE api/profile/keyInformation/:key_id
//@desc   Delete keyInformation from profile
//access  Private

router.delete('/keyInformation/:key_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.keyInformation
      .map((item) => item.id)
      .indexOf(req.params.key_id);
    profile.keyInformation.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500), send('server error');
  }
});

// @route    PUT api/profile/feeStructure
// @desc     Add profile feeStructure
// @access   Private
router.put(
  '/feeStructure',
  [
    auth,
    [
      check('totalFees', 'totalFees is required').not().isEmpty(),
      check('admissionfees', 'admissionfees is required').not().isEmpty(),
      check('otherFees', 'otherFees is required').not().isEmpty(),
      // check('from', 'From date is required and needs to be from the past')
      //   .not()
      //   .isEmpty()
      //   .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { totalFees, admissionfees, otherFees } = req.body;

    const newEdu = {
      totalFees,
      admissionfees,
      otherFees,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.feeStructure.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  DELETE api/profile/education/:edu_id
//@desc   Delete education from profile
//access  Private

router.delete('/feeStructure/:fee_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.feeStructure
      .map((item) => item.id)
      .indexOf(req.params.fee_id);
    profile.feeStructure.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500), send('server error');
  }
});

module.exports = router;
