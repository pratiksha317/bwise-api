const express = require('express');
const config = require('config');
const cors = require('cors');
const router = express.Router();
const auth = require('../../../middleware/auth1');
const Vender = require('../../../models/Vender');
const School = require('../../../models/School');
const { check, validationResult } = require('express-validator');

//@route GET api/school
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
      check('classification', 'classification is required').not().isEmpty(),

      check('board_of_education', 'grade is required').not().isEmpty(),
      check('grade', 'grade is required').not().isEmpty(),

      check('school_timimg', 'school_timimg is required').not().isEmpty(),
      check('mode_of_payment', 'mode_of_payment is required').not().isEmpty(),

      check('min_age', 'min_age is required').not().isEmpty(),

      check('instruction_lang', 'instruction_lang is required').not().isEmpty(),
      check('establishment_Year', 'establishment_Year is required')
        .not()
        .isEmpty(),
      check('aminities', 'aminities is required').not().isEmpty(),

      check('avg_anual_fee', 'avg_anual_fee is required').not().isEmpty(),
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
      classification,

      board_of_education,
      grade,
      school_timimg,
      mode_of_payment,

      min_age,
      instruction_lang,
      establishment_Year,
      aminities,

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
    const schoolFeilds = {};
    schoolFeilds.vender = req.vender.id;

    if (ownerName) schoolFeilds.ownerName = ownerName;
    if (schoolName) schoolFeilds.schoolName = schoolName;

    if (email_id) schoolFeilds.email_id = email_id;
    if (phone_number) schoolFeilds.phone_number = phone_number;
    if (landline_number) schoolFeilds.landline_number = landline_number;
    if (fax_number) schoolFeilds.fax_number = fax_number;
    if (website) schoolFeilds.website = website;

    if (state) schoolFeilds.state = state;
    if (location) schoolFeilds.location = location;
    if (pincode) schoolFeilds.pincode = pincode;
    if (address) schoolFeilds.address = address;
    if (about_school) schoolFeilds.about_school = about_school;
    if (google_location) schoolFeilds.google_location = google_location;

    if (schoolType) schoolFeilds.schoolType = schoolType;
    if (classification) schoolFeilds.classification = classification;
    if (board_of_education)
      schoolFeilds.board_of_education = board_of_education;
    if (grade) schoolFeilds.grade = grade;
    if (school_timimg) schoolFeilds.school_timimg = school_timimg;
    if (mode_of_payment) schoolFeilds.mode_of_payment = mode_of_payment;
    if (min_age) schoolFeilds.min_age = min_age;
    if (instruction_lang) schoolFeilds.instruction_lang = instruction_lang;
    if (establishment_Year)
      schoolFeilds.establishment_Year = establishment_Year;
    if (aminities) schoolFeilds.aminities = aminities;
    if (avg_anual_fee) schoolFeilds.avg_anual_fee = avg_anual_fee;
    if (other_fee) schoolFeilds.other_fee = other_fee;
    if (addmission_fee) schoolFeilds.addmission_fee = addmission_fee;
    if (is_refundable) schoolFeilds.is_refundable = is_refundable;

    if (admission_link) schoolFeilds.admission_link = admission_link;
    if (processing_fee) schoolFeilds.processing_fee = processing_fee;
    if (required_document) schoolFeilds.required_document = required_document;
    if (admission_process) schoolFeilds.admission_process = admission_process;

    // schoolFeilds.addressInformation = {};
    // if (email_id) schoolFeilds.addressInformation.email_id = email_id;
    // if (phone_number)
    //   schoolFeilds.addressInformation.phone_number = phone_number;
    // if (landline_number)
    //   schoolFeilds.addressInformation.landline_number = landline_number;
    // if (fax_number) schoolFeilds.addressInformation.fax_number = fax_number;
    // if (website) schoolFeilds.addressInformation.website = website;

    // if (state) schoolFeilds.addressInformation.state = state;
    // if (location) schoolFeilds.addressInformation.location = location;
    // if (pincode) schoolFeilds.addressInformation.pincode = pincode;
    // if (address) schoolFeilds.addressInformation.address = address;
    // if (about_school)
    //   schoolFeilds.addressInformation.about_school = about_school;
    // if (google_location)
    //   schoolFeilds.addressInformation.google_location = google_location;

    // schoolFeilds.keyInformation = {};
    // if (schoolType) schoolFeilds.keyInformation.schoolType = schoolType;
    // if (classification)
    //   schoolFeilds.keyInformation.classification = classification;
    // if (board_of_education)
    //   schoolFeilds.keyInformation.board_of_education = board_of_education;
    // if (grade) schoolFeilds.keyInformation.grade = grade;
    // if (school_timimg)
    //   schoolFeilds.keyInformation.school_timimg = school_timimg;
    // if (mode_of_payment)
    //   schoolFeilds.keyInformation.mode_of_payment = mode_of_payment;
    // if (min_age) schoolFeilds.keyInformation.min_age = min_age;
    // if (instruction_lang)
    //   schoolFeilds.keyInformation.instruction_lang = instruction_lang;
    // if (establishment_Year)
    //   schoolFeilds.keyInformation.establishment_Year = establishment_Year;
    // if (aminities) schoolFeilds.keyInformation.aminities = aminities;
    // if (avg_anual_fee)
    //   schoolFeilds.keyInformation.avg_anual_fee = avg_anual_fee;
    // if (other_fee) schoolFeilds.keyInformation.other_fee = other_fee;
    // if (addmission_fee)
    //   schoolFeilds.keyInformation.addmission_fee = addmission_fee;
    // if (is_refundable)
    //   schoolFeilds.keyInformation.is_refundable = is_refundable;

    // schoolFeilds.addmission_details = {};
    // if (admission_link)
    //   schoolFeilds.addmission_details.admission_link = admission_link;
    // if (processing_fee)
    //   schoolFeilds.addmission_details.processing_fee = processing_fee;
    // if (required_document)
    //   schoolFeilds.addmission_details.required_document = required_document;
    // if (admission_process)
    //   schoolFeilds.addmission_details.admission_process = admission_process;

    try {
      let school = await School.findOne({ vender: req.vender.id });

      if (school) {
        //Update
        school = await School.findOneAndUpdate(
          { vender: req.vender.id },
          { $set: schoolFeilds },
          { new: true }
        );

        return res.json({
          status: 1,
          message: 'Data updated successfully',
          data: school,
        });
      }

      //Create
      school = new School(schoolFeilds);

      await school.save();
      return res.json({
        status: 1,
        message: 'Data added successfully',
        data: school,
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
    const school = await School.find();
    return res.json({
      status: 1,
      message: 'success',
      data: school,
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
    const school = await School.findOne({
      vender: req.params.vender_id,
    });

    if (!school)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: school,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'objectId') {
      return res.status(400).json({ status: 0, msg: 'data not found' });
    }
    res.status(500).send('server error');
  }
});

//@route GET api/school/vender/vender_id
//@desc  Get school by User Id
//access  Public
router.post(
  '/search',
  [check('location', 'location is required').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const { location } = req.body;

    // school = new School({
    //   location,
    // });

    try {
      // const school = await School.find({ school: req.params.location });
      let school = await School.find(req.params.location);

      if (!school)
        return res.status(400).json({ status: 0, msg: 'data not found' });

      return res.json({
        status: 1,
        message: 'success',
        data: school,
      });
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'objectId') {
        return res.status(400).json({ status: 0, msg: 'data not found' });
      }
      res.status(500).send('server error');
    }
  }
);

//@route GET api/find/:query
//@desc  Search Yoga school by location
//access  Public

router.get('/find/:query', cors(), function (req, res) {
  var query = req.params.query;

  School.find(
    {
      location: query,
    },
    function (err, school) {
      if (err) throw err;
      if (school) {
        res.json(school);
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
//       const school = await School.findOne({ vender: req.vender.id });
//       school.addressInformation.unshift(newExp);
//       await school.save();
//       res.json(school);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

//@route  PUT api/preschool/keyInformation
//@desc   Add preschool keyInformation
//access  Private

// router.put(
//   '/keyInformation',
//   [
//     auth,
//     [
//       check('schoolType', 'schoolType is required').not().isEmpty(),
//       check('classification', 'classification is required').not().isEmpty(),

//       check('board_of_education', 'grade is required').not().isEmpty(),
//       check('grade', 'grade is required').not().isEmpty(),

//       check('school_timimg', 'school_timimg is required').not().isEmpty(),
//       check('mode_of_payment', 'mode_of_payment is required').not().isEmpty(),

//       check('min_age', 'min_age is required').not().isEmpty(),

//       check('instruction_lang', 'instruction_lang is required').not().isEmpty(),
//       check('establishment_Year', 'establishment_Year is required')
//         .not()
//         .isEmpty(),
//       check('aminities', 'aminities is required').not().isEmpty(),

//       check('avg_anual_fee', 'avg_anual_fee is required').not().isEmpty(),
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
//       classification,

//       board_of_education,
//       grade,
//       school_timimg,
//       mode_of_payment,

//       min_age,
//       instruction_lang,
//       establishment_Year,
//       aminities,

//       avg_anual_fee,
//       other_fee,
//       addmission_fee,
//     } = req.body;

//     const newExp = {
//       schoolType,
//       classification,

//       board_of_education,
//       grade,
//       school_timimg,
//       mode_of_payment,

//       min_age,
//       instruction_lang,
//       establishment_Year,
//       aminities,

//       avg_anual_fee,
//       other_fee,
//       addmission_fee,
//     };

//     try {
//       const school = await School.findOne({ vender: req.vender.id });
//       school.keyInformation.unshift(newExp);
//       await school.save();
//       res.json(school);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

//@route  PUT api/preschool/keyInformation
//@desc   Add preschool keyInformation
//access  Private

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
//       const school = await School.findOne({ vender: req.vender.id });
//       school.addmission_details.unshift(newExp);
//       await school.save();
//       res.json(school);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

module.exports = router;
