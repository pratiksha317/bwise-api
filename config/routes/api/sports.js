const express = require('express');
const config = require('config');
const cors = require('cors');
const router = express.Router();
const auth = require('../../../middleware/auth1');
const Vender = require('../../../models/Vender');
const Sports = require('../../../models/Sports');
const { check, validationResult } = require('express-validator');

//@route GET api/school
//@desc  Create or Update schhol
//access  Private

router.post(
  '/',
  [
    auth,
    [
      check('owner_name', 'owner_name is required').not().isEmpty(),
      check('academy_name', 'academy_name is required').not().isEmpty(),
      check('game_type', 'game_type is required').not().isEmpty(),

      check('email_id', 'email_id is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('landline_number', 'landline_number is required').not().isEmpty(),

      check('fax_number', 'fax_number is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),

      check('state', 'state year is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),

      check('address', 'address year is required').not().isEmpty(),
      check('about_sports', 'about_sports is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),

      check('sports', 'sports is required').not().isEmpty(),
      check('grade', 'grade is required').not().isEmpty(),
      check('number_of_coach', 'number_of_coach is required').not().isEmpty(),

      check('timing', 'timing is required').not().isEmpty(),

      check('establishment_Year', 'establishment_Year is required')
        .not()
        .isEmpty(),
      check('avg_anual_fee', 'avg_anual_fee is required').not().isEmpty(),

      check('addmission_fee', 'addmission_fee is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      owner_name,
      academy_name,
      game_type,
      email_id,
      phone_number,
      landline_number,
      fax_number,
      website,
      state,
      location,
      pincode,
      address,
      about_sports,
      google_location,
      sports,
      grade,
      number_of_coach,

      timing,
      establishment_Year,

      avg_anual_fee,

      addmission_fee,
      is_refundable,
    } = req.body;

    // Build School Object
    const sportsFeilds = {};
    sportsFeilds.vender = req.vender.id;

    if (owner_name) sportsFeilds.owner_name = owner_name;
    if (academy_name) sportsFeilds.academy_name = academy_name;
    if (game_type) sportsFeilds.game_type = game_type;

    if (email_id) sportsFeilds.email_id = email_id;
    if (phone_number) sportsFeilds.phone_number = phone_number;
    if (landline_number) sportsFeilds.landline_number = landline_number;
    if (fax_number) sportsFeilds.fax_number = fax_number;

    if (website) sportsFeilds.website = website;

    if (state) sportsFeilds.state = state;
    if (location) sportsFeilds.location = location;
    if (pincode) sportsFeilds.pincode = pincode;
    if (address) sportsFeilds.address = address;
    if (about_sports) sportsFeilds.about_sports = about_sports;
    if (google_location) sportsFeilds.google_location = google_location;

    if (sports) sportsFeilds.sports = sports;
    if (grade) sportsFeilds.grade = grade;
    if (number_of_coach) sportsFeilds.number_of_coach = number_of_coach;

    if (timing) sportsFeilds.timing = timing;

    if (establishment_Year)
      sportsFeilds.establishment_Year = establishment_Year;

    if (avg_anual_fee) sportsFeilds.avg_anual_fee = avg_anual_fee;

    if (addmission_fee) sportsFeilds.addmission_fee = addmission_fee;
    if (is_refundable) sportsFeilds.is_refundable = is_refundable;

    // sportsFeilds.addressInformation = {};
    // if (email_id) sportsFeilds.addressInformation.email_id = email_id;
    // if (phone_number)
    //   sportsFeilds.addressInformation.phone_number = phone_number;
    // if (landline_number)
    //   sportsFeilds.addressInformation.landline_number = landline_number;
    // if (fax_number) sportsFeilds.addressInformation.fax_number = fax_number;

    // if (website) sportsFeilds.addressInformation.website = website;

    // if (state) sportsFeilds.addressInformation.state = state;
    // if (location) sportsFeilds.addressInformation.location = location;
    // if (pincode) sportsFeilds.addressInformation.pincode = pincode;
    // if (address) sportsFeilds.addressInformation.address = address;
    // if (about_sports)
    //   sportsFeilds.addressInformation.about_sports = about_sports;
    // if (google_location)
    //   sportsFeilds.addressInformation.google_location = google_location;

    // sportsFeilds.keyInformation = {};
    // if (sports) sportsFeilds.keyInformation.sports = sports;
    // if (grade) sportsFeilds.keyInformation.grade = grade;
    // if (number_of_coach)
    //   sportsFeilds.keyInformation.number_of_coach = number_of_coach;

    // if (timing) sportsFeilds.keyInformation.timing = timing;

    // if (establishment_Year)
    //   sportsFeilds.keyInformation.establishment_Year = establishment_Year;

    // if (avg_anual_fee)
    //   sportsFeilds.keyInformation.avg_anual_fee = avg_anual_fee;

    // if (addmission_fee)
    //   sportsFeilds.keyInformation.addmission_fee = addmission_fee;
    // if (is_refundable)
    //   sportsFeilds.keyInformation.is_refundable = is_refundable;

    try {
      let sports = await Sports.findOne({ vender: req.vender.id });

      if (sports) {
        //Update
        sports = await Sports.findOneAndUpdate(
          { vender: req.vender.id },
          { $set: sportsFeilds },
          { new: true }
        );

        return res.json({
          status: 1,
          message: 'data updated successfully',
          data: sports,
        });
      }

      //Create
      sports = new Sports(sportsFeilds);

      await sports.save();
      return res.json({
        status: 1,
        message: 'data added successfully',
        data: sports,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route GET api/school
//@desc  Get all school
//access  Public

router.get('/', async (req, res) => {
  try {
    const sports = await Sports.find();
    return res.json({
      status: 1,
      message: 'success',
      data: sports,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route GET api/school/vender/vender_id
//@desc  Get school by User Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const sports = await Sports.findOne({
      vender: req.params.vender_id,
    });

    if (!sports)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: sports,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'objectId') {
      return res.status(400).json({ status: 0, msg: 'data not found' });
    }
    res.status(500).send('server error');
  }
});

//@route GET api/find/:query
//@desc  Search Yoga school by location
//access  Public

router.get('/find/:query', cors(), function (req, res) {
  var query = req.params.query;

  Sports.find(
    {
      location: query,
    },
    function (err, sports) {
      if (err) throw err;
      if (sports) {
        res.json(sports);
      } else {
        res.send(
          JSON.stringify({
            error: 'Error',
          })
        );
      }
    }
  );
});

module.exports = router;
