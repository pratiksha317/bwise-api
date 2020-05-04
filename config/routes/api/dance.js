const express = require('express');
const config = require('config');
const cors = require('cors');
const router = express.Router();
const auth = require('../../../middleware/auth1');
const Vender = require('../../../models/Vender');
const Dance = require('../../../models/Dance');
const { check, validationResult } = require('express-validator');

//@route GET api/school
//@desc  Create or Update schhol
//access  Private

router.post(
  '/',
  [
    auth,
    [
      check('dance_schoolName', 'dance_schoolName is required').not().isEmpty(),
      check('email_id', 'email_id is required').not().isEmpty(),

      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('landline_number', 'landline_number is required').not().isEmpty(),

      check('website', 'website is required').not().isEmpty(),

      check('state', 'state year is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),

      check('address', 'address year is required').not().isEmpty(),
      check('about_school', 'about_school is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),

      check('dance_style', 'dance_style is required').not().isEmpty(),
      check('style', 'style is required').not().isEmpty(),

      check('number_of_trainee', 'number_of_trainee is required')
        .not()
        .isEmpty(),
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
      dance_schoolName,
      email_id,
      phone_number,
      landline_number,

      website,
      state,
      location,
      pincode,
      address,
      about_school,
      google_location,
      dance_style,
      style,

      number_of_trainee,
      timing,
      establishment_Year,

      avg_anual_fee,

      addmission_fee,
      is_refundable,
    } = req.body;

    // Build dance feild Object
    const danceFeilds = {};
    danceFeilds.vender = req.vender.id;

    if (dance_schoolName) danceFeilds.dance_schoolName = dance_schoolName;

    if (email_id) danceFeilds.email_id = email_id;
    if (phone_number) danceFeilds.phone_number = phone_number;
    if (landline_number) danceFeilds.landline_number = landline_number;

    if (website) danceFeilds.website = website;

    if (state) danceFeilds.state = state;
    if (location) danceFeilds.location = location;
    if (pincode) danceFeilds.pincode = pincode;
    if (address) danceFeilds.address = address;
    if (about_school) danceFeilds.about_school = about_school;
    if (google_location) danceFeilds.google_location = google_location;

    if (dance_style) danceFeilds.dance_style = dance_style;
    if (style) danceFeilds.style = style;
    if (number_of_trainee) danceFeilds.number_of_trainee = number_of_trainee;

    if (timing) danceFeilds.timing = timing;

    if (establishment_Year) danceFeilds.establishment_Year = establishment_Year;

    if (avg_anual_fee) danceFeilds.avg_anual_fee = avg_anual_fee;

    if (addmission_fee) danceFeilds.addmission_fee = addmission_fee;
    if (is_refundable) danceFeilds.is_refundable = is_refundable;

    // danceFeilds.addressInformation = {};
    // if (email_id) danceFeilds.addressInformation.email_id = email_id;
    // if (phone_number)
    //   danceFeilds.addressInformation.phone_number = phone_number;
    // if (landline_number)
    //   danceFeilds.addressInformation.landline_number = landline_number;

    // if (website) danceFeilds.addressInformation.website = website;

    // if (state) danceFeilds.addressInformation.state = state;
    // if (location) danceFeilds.addressInformation.location = location;
    // if (pincode) danceFeilds.addressInformation.pincode = pincode;
    // if (address) danceFeilds.addressInformation.address = address;
    // if (about_school)
    //   danceFeilds.addressInformation.about_school = about_school;
    // if (google_location)
    //   danceFeilds.addressInformation.google_location = google_location;

    // danceFeilds.keyInformation = {};
    // if (dance_style) danceFeilds.keyInformation.dance_style = dance_style;
    // if (style) danceFeilds.keyInformation.style = style;
    // if (number_of_trainee)
    //   danceFeilds.keyInformation.number_of_trainee = number_of_trainee;

    // if (timing) danceFeilds.keyInformation.timing = timing;

    // if (establishment_Year)
    //   danceFeilds.keyInformation.establishment_Year = establishment_Year;

    // if (avg_anual_fee) danceFeilds.keyInformation.avg_anual_fee = avg_anual_fee;

    // if (addmission_fee)
    //   danceFeilds.keyInformation.addmission_fee = addmission_fee;
    // if (is_refundable) danceFeilds.keyInformation.is_refundable = is_refundable;

    try {
      let dance = await Dance.findOne({ vender: req.vender.id });

      if (dance) {
        //Update
        dance = await Dance.findOneAndUpdate(
          { vender: req.vender.id },
          { $set: danceFeilds },
          { new: true }
        );

        return res.json({
          status: 1,
          message: 'data updated successfully',
          data: dance,
        });
      }

      //Create
      dance = new Dance(danceFeilds);

      await dance.save();

      return res.json({
        status: 1,
        message: 'data added successfully',
        data: dance,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route GET api/dance
//@desc  Get all dance
//access  Public

router.get('/', async (req, res) => {
  try {
    const dance = await Dance.find();

    return res.json({
      status: 1,
      message: 'success',
      data: dance,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route GET api/dance/vender/vender_id
//@desc  Get dance by vender Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const dance = await Dance.findOne({
      vender: req.params.vender_id,
    });

    if (!dance)
      return res.status(400).json({ status: 0, msg: 'Data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: dance,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'objectId') {
      return res.status(400).json({ status: 0, msg: 'Data not found' });
    }
    res.status(500).send('server error');
  }
});

//@route GET api/find/:query
//@desc  Search Yoga school by location
//access  Public

router.get('/find/:query', cors(), function (req, res) {
  var query = req.params.query;

  Dance.find(
    {
      location: query,
    },
    function (err, dance) {
      if (err) throw err;
      if (dance) {
        res.json(dance);
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
