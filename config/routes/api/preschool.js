const express = require('express');
const config = require('config');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const Vender = require('../../../models/Vender');
const Preschool = require('../../../models/Preschool');
const { check, validationResult } = require('express-validator');

//@route GET api/preschool
//@desc  Create or Update schhol
//access  Private

router.post(
  '/',
  [
    auth,
    [
      check('ownerName', 'ownerName is required').not().isEmpty(),
      check('schoolName', 'SchoolName is required').not().isEmpty(),

      check('email_id', 'email_id is required').not().isEmpty(),

      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('landline_number', 'landline_number is required').not().isEmpty(),
      check('fax_number', 'fax_number is required').not().isEmpty(),

      check('website', 'website is required').not().isEmpty(),

      check('state', 'state year is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),

      check('address', 'address year is required').not().isEmpty(),
      check('about_school', 'about_school is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),

      check('schoolType', 'schoolType is required').not().isEmpty(),

      check('board_of_education', 'grade is required').not().isEmpty(),
      check('opening_timimg', 'opening_timimg is required').not().isEmpty(),
      check('number_of_teachers', 'number_of_teachers is required')
        .not()
        .isEmpty(),

      check('establishment_Year', 'establishment_Year is required')
        .not()
        .isEmpty(),

      check('avg_anual_fee', 'mode_of_payment year is required')
        .not()
        .isEmpty(),
      check('other_fee', 'other_fee is required').not().isEmpty(),
      check('addmission_fee', 'addmission_fee is required').not().isEmpty(),

      check('admission_link', 'admission_link is required').not().isEmpty(),

      check('processing_fee', 'processing_fee is required').not().isEmpty(),
      check('required_document', 'required_document is required')
        .not()
        .isEmpty(),
      check('admission_process', 'admission_process is required')
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
      ownerName,
      schoolName,
      email_id,
      phone_number,
      landline_number,
      fax_number,
      website,
      state,
      location,
      pincode,
      address,
      about_school,
      google_location,
      schoolType,

      board_of_education,
      opening_timimg,
      number_of_teachers,

      establishment_Year,

      avg_anual_fee,
      other_fee,
      addmission_fee,
      is_refundable,
      admission_link,

      processing_fee,
      required_document,
      admission_process,
    } = req.body;

    // Build School Object
    const preschoolFeilds = {};
    preschoolFeilds.vender = req.vender.id;

    if (ownerName) preschoolFeilds.ownerName = ownerName;
    if (schoolName) preschoolFeilds.schoolName = schoolName;

    if (email_id) preschoolFeilds.email_id = email_id;
    if (phone_number) preschoolFeilds.phone_number = phone_number;
    if (landline_number) preschoolFeilds.landline_number = landline_number;
    if (fax_number) preschoolFeilds.fax_number = fax_number;
    if (website) preschoolFeilds.website = website;

    if (state) preschoolFeilds.state = state;
    if (location) preschoolFeilds.location = location;
    if (pincode) preschoolFeilds.pincode = pincode;
    if (address) preschoolFeilds.address = address;
    if (about_school) preschoolFeilds.about_school = about_school;
    if (google_location) preschoolFeilds.google_location = google_location;

    if (schoolType) preschoolFeilds.schoolType = schoolType;

    if (board_of_education)
      preschoolFeilds.board_of_education = board_of_education;
    if (opening_timimg) preschoolFeilds.opening_timimg = opening_timimg;
    if (number_of_teachers)
      preschoolFeilds.number_of_teachers = number_of_teachers;

    if (establishment_Year)
      preschoolFeilds.establishment_Year = establishment_Year;

    if (avg_anual_fee) preschoolFeilds.avg_anual_fee = avg_anual_fee;
    if (other_fee) preschoolFeilds.other_fee = other_fee;
    if (addmission_fee) preschoolFeilds.addmission_fee = addmission_fee;
    if (is_refundable) preschoolFeilds.is_refundable = is_refundable;

    if (admission_link) preschoolFeilds.admission_link = admission_link;
    if (processing_fee) preschoolFeilds.processing_fee = processing_fee;
    if (required_document)
      preschoolFeilds.required_document = required_document;
    if (admission_process)
      preschoolFeilds.admission_process = admission_process;

    // preschoolFeilds.addressInformation = {};
    // if (email_id) preschoolFeilds.addressInformation.email_id = email_id;
    // if (phone_number)
    //   preschoolFeilds.addressInformation.phone_number = phone_number;
    // if (landline_number)
    //   preschoolFeilds.addressInformation.landline_number = landline_number;
    // if (fax_number) preschoolFeilds.addressInformation.fax_number = fax_number;
    // if (website) preschoolFeilds.addressInformation.website = website;

    // if (state) preschoolFeilds.addressInformation.state = state;
    // if (location) preschoolFeilds.addressInformation.location = location;
    // if (pincode) preschoolFeilds.addressInformation.pincode = pincode;
    // if (address) preschoolFeilds.addressInformation.address = address;
    // if (about_school)
    //   preschoolFeilds.addressInformation.about_school = about_school;
    // if (google_location)
    //   preschoolFeilds.addressInformation.google_location = google_location;

    // preschoolFeilds.keyInformation = {};

    // if (schoolType) preschoolFeilds.keyInformation.schoolType = schoolType;

    // if (board_of_education)
    //   preschoolFeilds.keyInformation.board_of_education = board_of_education;
    // if (opening_timimg)
    //   preschoolFeilds.keyInformation.opening_timimg = opening_timimg;
    // if (number_of_teachers)
    //   preschoolFeilds.keyInformation.number_of_teachers = number_of_teachers;

    // if (establishment_Year)
    //   preschoolFeilds.keyInformation.establishment_Year = establishment_Year;

    // if (avg_anual_fee)
    //   preschoolFeilds.keyInformation.avg_anual_fee = avg_anual_fee;
    // if (other_fee) preschoolFeilds.keyInformation.other_fee = other_fee;
    // if (addmission_fee)
    //   preschoolFeilds.keyInformation.addmission_fee = addmission_fee;
    // if (is_refundable)
    //   preschoolFeilds.keyInformation.is_refundable = is_refundable;

    // preschoolFeilds.addmission_details = {};
    // if (admission_link)
    //   preschoolFeilds.addmission_details.admission_link = admission_link;
    // if (processing_fee)
    //   preschoolFeilds.addmission_details.processing_fee = processing_fee;
    // if (required_document)
    //   preschoolFeilds.addmission_details.required_document = required_document;
    // if (admission_process)
    //   preschoolFeilds.addmission_details.admission_process = admission_process;

    try {
      let preschool = await Preschool.findOne({ vender: req.vender.id });

      if (preschool) {
        //Update
        preschool = await Preschool.findOneAndUpdate(
          { vender: req.vender.id },
          { $set: preschoolFeilds },
          { new: true }
        );

        return res.json({
          status: 1,
          message: 'data updated successfully',
          data: preschool,
        });
      }

      //Create
      preschool = new Preschool(preschoolFeilds);

      await preschool.save();
      return res.json({
        status: 1,
        message: 'data added successfully',
        data: preschool,
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
    const preschool = await Preschool.find();
    return res.json({
      status: 1,
      message: 'success',
      data: preschool,
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
    const preschool = await Preschool.findOne({
      vender: req.params.vender_id,
    });

    if (!preschool)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: preschool,
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

  Preschool.find(
    {
      location: query,
    },
    function (err, preschool) {
      if (err) throw err;
      if (preschool) {
        res.json(preschool);
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

//@route  PUT api/preschool/keyInformation
//@desc   Add preschool keyInformation
//access  Private

// router.put(
//   '/addressInformation',
//   [
//     auth,
//     [
//       check('email_id', 'email_id is required').not().isEmpty(),

//       check('phone_number', 'phone_number is required').not().isEmpty(),
//       check('landline_number', 'landline_number is required').not().isEmpty(),
//       check('fax_number', 'fax_number is required').not().isEmpty(),

//       check('website', 'website is required').not().isEmpty(),

//       check('state', 'state year is required').not().isEmpty(),
//       check('location', 'location is required').not().isEmpty(),
//       check('pincode', 'pincode is required').not().isEmpty(),

//       check('address', 'address year is required').not().isEmpty(),
//       check('about_school', 'about_school is required').not().isEmpty(),
//       check('google_location', 'google_location is required').not().isEmpty(),
//     ],
//   ],

//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const {
//       email_id,
//       phone_number,
//       landline_number,
//       fax_number,
//       website,
//       state,
//       location,
//       pincode,
//       address,
//       about_school,
//       google_location,
//     } = req.body;

//     const newExp = {
//       email_id,
//       phone_number,
//       landline_number,
//       fax_number,
//       website,
//       state,
//       location,
//       pincode,
//       address,
//       about_school,
//       google_location,
//     };

//     try {
//       const preschool = await Preschool.findOne({ vender: req.vender.id });
//       preschool.addressInformation.unshift(newExp);
//       await preschool.save();
//       res.json(preschool);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// //@route  PUT api/preschool/keyInformation
// //@desc   Add preschool keyInformation
// //access  Private

// router.put(
//   '/keyInformation',
//   [
//     auth,
//     [
//       check('schoolType', 'schoolType is required').not().isEmpty(),

//       check('board_of_education', 'grade is required').not().isEmpty(),
//       check('opening_timimg', 'opening_timimg is required').not().isEmpty(),
//       check('number_of_teachers', 'number_of_teachers is required')
//         .not()
//         .isEmpty(),

//       check('establishment_Year', 'establishment_Year is required')
//         .not()
//         .isEmpty(),

//       check('avg_anual_fee', 'mode_of_payment year is required')
//         .not()
//         .isEmpty(),
//       check('other_fee', 'other_fee is required').not().isEmpty(),
//       check('addmission_fee', 'addmission_fee is required').not().isEmpty(),
//     ],
//   ],

//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const {
//       schoolType,

//       board_of_education,
//       opening_timimg,
//       number_of_teachers,

//       establishment_Year,

//       avg_anual_fee,
//       other_fee,
//       addmission_fee,
//     } = req.body;

//     const newExp = {
//       schoolType,

//       board_of_education,
//       opening_timimg,
//       number_of_teachers,

//       establishment_Year,

//       avg_anual_fee,
//       other_fee,
//       addmission_fee,
//     };

//     try {
//       const preschool = await Preschool.findOne({ vender: req.vender.id });
//       preschool.keyInformation.unshift(newExp);
//       await preschool.save();
//       res.json(preschool);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// //@route  PUT api/preschool/keyInformation
// //@desc   Add preschool keyInformation
// //access  Private

// router.put(
//   '/addmission_details',
//   [
//     auth,
//     [
//       check('admission_link', 'admission_link is required').not().isEmpty(),

//       check('processing_fee', 'processing_fee is required').not().isEmpty(),
//       check('required_document', 'required_document is required')
//         .not()
//         .isEmpty(),
//       check('admission_process', 'admission_process is required')
//         .not()
//         .isEmpty(),
//     ],
//   ],

//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const {
//       admission_link,

//       processing_fee,
//       required_document,
//       admission_process,
//     } = req.body;

//     const newExp = {
//       admission_link,

//       processing_fee,
//       required_document,
//       admission_process,
//     };

//     try {
//       const preschool = await Preschool.findOne({ vender: req.vender.id });
//       preschool.addmission_details.unshift(newExp);
//       await preschool.save();
//       res.json(preschool);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

module.exports = router;
