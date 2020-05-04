const express = require('express');
const config = require('config');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const Vender = require('../../../models/Vender');
const PartyHall = require('../../../models/PartyHall');
const { check, validationResult } = require('express-validator');

//@route GET api/school
//@desc  Create or Update schhol
//access  Private

router.post(
  '/',
  [
    auth,
    [
      check('incharge_name', 'incharge_name is required').not().isEmpty(),
      check('partyhall_name', 'partyhall_name is required').not().isEmpty(),

      check('email_id', 'email_id is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('landline_number', 'landline_number is required').not().isEmpty(),

      check('fax_number', 'fax_number is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),

      check('state', 'state year is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),

      check('address', 'address year is required').not().isEmpty(),
      check('about_partyhall', 'about_partyhall is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),

      check('number_of_people_in_hall', 'number_of_people_in_hall is required')
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
      incharge_name,
      partyhall_name,

      email_id,
      phone_number,
      landline_number,
      fax_number,
      website,
      state,
      location,
      pincode,
      address,
      about_partyhall,
      google_location,
      number_of_people_in_hall,

      timing,
      establishment_Year,

      avg_anual_fee,

      addmission_fee,
      is_refundable,
    } = req.body;

    // Build School Object
    const partyFeilds = {};
    partyFeilds.vender = req.vender.id;

    if (incharge_name) partyFeilds.incharge_name = incharge_name;
    if (partyhall_name) partyFeilds.partyhall_name = partyhall_name;

    if (email_id) partyFeilds.email_id = email_id;
    if (phone_number) partyFeilds.phone_number = phone_number;
    if (landline_number) partyFeilds.landline_number = landline_number;
    if (fax_number) partyFeilds.fax_number = fax_number;

    if (website) partyFeilds.website = website;

    if (state) partyFeilds.state = state;
    if (location) partyFeilds.location = location;
    if (pincode) partyFeilds.pincode = pincode;
    if (address) partyFeilds.address = address;
    if (about_partyhall) partyFeilds.about_partyhall = about_partyhall;
    if (google_location) partyFeilds.google_location = google_location;

    if (number_of_people_in_hall)
      partyFeilds.number_of_people_in_hall = number_of_people_in_hall;

    if (timing) partyFeilds.timing = timing;

    if (establishment_Year) partyFeilds.establishment_Year = establishment_Year;

    if (avg_anual_fee) partyFeilds.avg_anual_fee = avg_anual_fee;

    if (addmission_fee) partyFeilds.addmission_fee = addmission_fee;
    if (is_refundable) partyFeilds.is_refundable = is_refundable;

    // partyFeilds.addressInformation = {};
    // if (email_id) partyFeilds.addressInformation.email_id = email_id;
    // if (phone_number)
    //   partyFeilds.addressInformation.phone_number = phone_number;
    // if (landline_number)
    //   partyFeilds.addressInformation.landline_number = landline_number;
    // if (fax_number) partyFeilds.addressInformation.fax_number = fax_number;

    // if (website) partyFeilds.addressInformation.website = website;

    // if (state) partyFeilds.addressInformation.state = state;
    // if (location) partyFeilds.addressInformation.location = location;
    // if (pincode) partyFeilds.addressInformation.pincode = pincode;
    // if (address) partyFeilds.addressInformation.address = address;
    // if (about_partyhall)
    //   partyFeilds.addressInformation.about_partyhall = about_partyhall;
    // if (google_location)
    //   partyFeilds.addressInformation.google_location = google_location;

    // partyFeilds.keyInformation = {};
    // if (number_of_people_in_hall)
    //   partyFeilds.keyInformation.number_of_people_in_hall = number_of_people_in_hall;

    // if (timing) partyFeilds.keyInformation.timing = timing;

    // if (establishment_Year)
    //   partyFeilds.keyInformation.establishment_Year = establishment_Year;

    // if (avg_anual_fee) partyFeilds.keyInformation.avg_anual_fee = avg_anual_fee;

    // if (addmission_fee)
    //   partyFeilds.keyInformation.addmission_fee = addmission_fee;
    // if (is_refundable) partyFeilds.keyInformation.is_refundable = is_refundable;

    try {
      let partyhall = await PartyHall.findOne({ vender: req.vender.id });

      if (partyhall) {
        //Update
        partyhall = await PartyHall.findOneAndUpdate(
          { vender: req.vender.id },
          { $set: partyFeilds },
          { new: true }
        );

        return res.json({
          status: 1,
          message: 'data updated successfully',
          data: partyhall,
        });
      }

      //Create
      partyhall = new PartyHall(partyFeilds);

      await partyhall.save();
      return res.json({
        status: 1,
        message: 'data added successfully',
        data: partyhall,
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
    const partyhall = await PartyHall.find();
    return res.json({
      status: 1,
      message: 'success',
      data: partyhall,
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
    const partyhall = await PartyHall.findOne({
      vender: req.params.vender_id,
    });

    if (!partyhall)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: partyhall,
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

  PartyHall.find(
    {
      location: query,
    },
    function (err, partyhall) {
      if (err) throw err;
      if (partyhall) {
        res.json(partyhall);
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
