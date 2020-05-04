const express = require('express');
const config = require('config');
const cors = require('cors');
const router = express.Router();
const auth = require('../../../middleware/auth1');
const Vender = require('../../../models/Vender');
const Tution = require('../../../models/Tution');
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
      check('tution_name', 'tution_name is required').not().isEmpty(),

      check('email_id', 'email_id is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('landline_number', 'landline_number is required').not().isEmpty(),

      check('fax_number', 'fax_number is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),

      check('state', 'state year is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),

      check('address', 'address year is required').not().isEmpty(),
      check('about_tution', 'about_tution is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),

      check('subject', 'subject is required').not().isEmpty(),
      check('grade', 'grade is required').not().isEmpty(),
      check('number_of_teachers', 'number_of_teachers is required')
        .not()
        .isEmpty(),

      check('timing', 'timing is required').not().isEmpty(),
      check('instruction_lang', 'instruction_lang is required').not().isEmpty(),

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
      tution_name,

      email_id,
      phone_number,
      landline_number,
      fax_number,
      website,
      state,
      location,
      pincode,
      address,
      about_tution,
      google_location,
      subject,
      grade,
      number_of_teachers,
      timing,
      instruction_lang,
      establishment_Year,

      avg_anual_fee,

      addmission_fee,
      is_refundable,
    } = req.body;

    // Build School Object
    const tutionFeilds = {};
    tutionFeilds.vender = req.vender.id;

    if (owner_name) tutionFeilds.owner_name = owner_name;
    if (tution_name) tutionFeilds.tution_name = tution_name;

    if (email_id) tutionFeilds.email_id = email_id;
    if (phone_number) tutionFeilds.phone_number = phone_number;
    if (landline_number) tutionFeilds.landline_number = landline_number;
    if (fax_number) tutionFeilds.fax_number = fax_number;

    if (website) tutionFeilds.website = website;

    if (state) tutionFeilds.state = state;
    if (location) tutionFeilds.location = location;
    if (pincode) tutionFeilds.pincode = pincode;
    if (address) tutionFeilds.address = address;
    if (about_tution) tutionFeilds.about_tution = about_tution;
    if (google_location) tutionFeilds.google_location = google_location;

    if (subject) tutionFeilds.subject = subject;
    if (grade) tutionFeilds.grade = grade;
    if (number_of_teachers)
      tutionFeilds.number_of_teachers = number_of_teachers;

    if (timing) tutionFeilds.timing = timing;
    if (instruction_lang) tutionFeilds.instruction_lang = instruction_lang;

    if (establishment_Year)
      tutionFeilds.establishment_Year = establishment_Year;

    if (avg_anual_fee) tutionFeilds.avg_anual_fee = avg_anual_fee;

    if (addmission_fee) tutionFeilds.addmission_fee = addmission_fee;
    if (is_refundable) tutionFeilds.is_refundable = is_refundable;

    // tutionFeilds.addressInformation = {};
    // if (email_id) tutionFeilds.addressInformation.email_id = email_id;
    // if (phone_number)
    //   tutionFeilds.addressInformation.phone_number = phone_number;
    // if (landline_number)
    //   tutionFeilds.addressInformation.landline_number = landline_number;
    // if (fax_number) tutionFeilds.addressInformation.fax_number = fax_number;

    // if (website) tutionFeilds.addressInformation.website = website;

    // if (state) tutionFeilds.addressInformation.state = state;
    // if (location) tutionFeilds.addressInformation.location = location;
    // if (pincode) tutionFeilds.addressInformation.pincode = pincode;
    // if (address) tutionFeilds.addressInformation.address = address;
    // if (about_tution)
    //   tutionFeilds.addressInformation.about_tution = about_tution;
    // if (google_location)
    //   tutionFeilds.addressInformation.google_location = google_location;

    // tutionFeilds.keyInformation = {};
    // if (subject) tutionFeilds.keyInformation.subject = subject;
    // if (grade) tutionFeilds.keyInformation.grade = grade;
    // if (number_of_teachers)
    //   tutionFeilds.keyInformation.number_of_teachers = number_of_teachers;

    // if (timing) tutionFeilds.keyInformation.timing = timing;
    // if (instruction_lang)
    //   tutionFeilds.keyInformation.instruction_lang = instruction_lang;

    // if (establishment_Year)
    //   tutionFeilds.keyInformation.establishment_Year = establishment_Year;

    // if (avg_anual_fee)
    //   tutionFeilds.keyInformation.avg_anual_fee = avg_anual_fee;

    // if (addmission_fee)
    //   tutionFeilds.keyInformation.addmission_fee = addmission_fee;
    // if (is_refundable)
    //   tutionFeilds.keyInformation.is_refundable = is_refundable;

    try {
      let tution = await Tution.findOne({ vender: req.vender.id });

      if (tution) {
        //Update
        tution = await Tution.findOneAndUpdate(
          { vender: req.vender.id },
          { $set: tutionFeilds },
          { new: true }
        );

        return res.json({
          status: 1,
          message: 'data updated successfully',
          data: tution,
        });
      }

      //Create
      tution = new Tution(tutionFeilds);

      await tution.save();
      return res.json({
        status: 1,
        message: 'data added successfully',
        data: tution,
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
    const tution = await Tution.find();
    return res.json({
      status: 1,
      message: 'success',
      data: tution,
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
    const tution = await Tution.findOne({
      vender: req.params.vender_id,
    });

    if (!tution)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: tution,
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

  tution.find(
    {
      location: query,
    },
    function (err, tution) {
      if (err) throw err;
      if (tution) {
        res.json(tution);
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
