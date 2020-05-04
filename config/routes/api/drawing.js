const express = require('express');
const config = require('config');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const Vender = require('../../../models/Vender');
const Drawing = require('../../../models/Drawing');
const { check, validationResult } = require('express-validator');

//@route GET api/school
//@desc  Create or Update schhol
//access  Private

router.post(
  '/',
  [
    auth,
    [
      check('organisation_name', 'organisation_name is required')
        .not()
        .isEmpty(),
      check('trainee_name', 'trainee_name is required').not().isEmpty(),

      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('landline_number', 'landline_number is required').not().isEmpty(),

      check('website', 'website is required').not().isEmpty(),

      check('state', 'state year is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),

      check('address', 'address year is required').not().isEmpty(),
      check('about_school', 'about_school is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),

      check('type_of_drawing', 'type_of_drawing is required').not().isEmpty(),
      check('available_days', 'available_days is required').not().isEmpty(),

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
      organisation_name,
      trainee_name,

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
      type_of_drawing,
      available_days,

      number_of_trainee,
      timing,
      establishment_Year,

      avg_anual_fee,

      addmission_fee,
      is_refundable,
    } = req.body;

    // Build School Object
    const drawFeilds = {};
    drawFeilds.vender = req.vender.id;

    if (organisation_name) drawFeilds.organisation_name = organisation_name;
    if (trainee_name) drawFeilds.trainee_name = trainee_name;

    if (email_id) drawFeilds.email_id = email_id;
    if (phone_number) drawFeilds.phone_number = phone_number;
    if (landline_number) drawFeilds.landline_number = landline_number;

    if (website) drawFeilds.website = website;

    if (state) drawFeilds.state = state;
    if (location) drawFeilds.location = location;
    if (pincode) drawFeilds.pincode = pincode;
    if (address) drawFeilds.address = address;
    if (about_school) drawFeilds.about_school = about_school;
    if (google_location) drawFeilds.google_location = google_location;

    if (type_of_drawing) drawFeilds.type_of_drawing = type_of_drawing;
    if (available_days) drawFeilds.available_days = available_days;
    if (number_of_trainee) drawFeilds.number_of_trainee = number_of_trainee;

    if (timing) drawFeilds.timing = timing;

    if (establishment_Year) drawFeilds.establishment_Year = establishment_Year;

    if (avg_anual_fee) drawFeilds.avg_anual_fee = avg_anual_fee;

    if (addmission_fee) drawFeilds.addmission_fee = addmission_fee;
    if (is_refundable) drawFeilds.is_refundable = is_refundable;

    // drawFeilds.addressInformation = {};
    // if (email_id) drawFeilds.addressInformation.email_id = email_id;
    // if (phone_number) drawFeilds.addressInformation.phone_number = phone_number;
    // if (landline_number)
    //   drawFeilds.addressInformation.landline_number = landline_number;

    // if (website) drawFeilds.addressInformation.website = website;

    // if (state) drawFeilds.addressInformation.state = state;
    // if (location) drawFeilds.addressInformation.location = location;
    // if (pincode) drawFeilds.addressInformation.pincode = pincode;
    // if (address) drawFeilds.addressInformation.address = address;
    // if (about_school) drawFeilds.addressInformation.about_school = about_school;
    // if (google_location)
    //   drawFeilds.addressInformation.google_location = google_location;

    // drawFeilds.keyInformation = {};
    // if (type_of_drawing)
    //   drawFeilds.keyInformation.type_of_drawing = type_of_drawing;
    // if (available_days)
    //   drawFeilds.keyInformation.available_days = available_days;
    // if (number_of_trainee)
    //   drawFeilds.keyInformation.number_of_trainee = number_of_trainee;

    // if (timing) drawFeilds.keyInformation.timing = timing;

    // if (establishment_Year)
    //   drawFeilds.keyInformation.establishment_Year = establishment_Year;

    // if (avg_anual_fee) drawFeilds.keyInformation.avg_anual_fee = avg_anual_fee;

    // if (addmission_fee)
    //   drawFeilds.keyInformation.addmission_fee = addmission_fee;
    // if (is_refundable) drawFeilds.keyInformation.is_refundable = is_refundable;

    try {
      let drawing = await Drawing.findOne({ vender: req.vender.id });

      if (drawing) {
        //Update
        drawing = await Drawing.findOneAndUpdate(
          { vender: req.vender.id },
          { $set: drawFeilds },
          { new: true }
        );

        return res.json({
          status: 1,
          message: 'data updated successfully',
          data: drawing,
        });
      }

      //Create
      drawing = new Drawing(drawFeilds);

      await drawing.save();
      return res.json({
        status: 1,
        message: 'data added successfully',
        data: drawing,
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
    const drawing = await Drawing.find();
    return res.json({
      status: 1,
      message: 'success',
      data: drawing,
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
    const drawing = await Drawing.findOne({
      vender: req.params.vender_id,
    });

    if (!drawing)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: drawing,
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

  Drawing.find(
    {
      location: query,
    },
    function (err, drawing) {
      if (err) throw err;
      if (drawing) {
        res.json(drawing);
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
