const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

//call vender module
const Vender = require('../../../models/Vender');

//@route POST api/vender
//desc Test route
//@access Public

router.post(
  '/',
  [
    check('organisation_name', 'organisation_name is required').not().isEmpty(),
    check('owner_name', 'owner_name is required').not().isEmpty(),
    check(
      'organisation_register_number',
      'organisation_register_number is required'
    )
      .not()
      .isEmpty(),
    check('email_id', 'Please include a valid email_id').isEmail(),
    check('phone_number', 'phone_number is required').not().isEmpty(),
    check('organisation_type', 'organisation_type is required').not().isEmpty(),
    check('state', 'state is required').not().isEmpty(),
    check('location', 'location is required').not().isEmpty(),
    check('pin_code', 'pin_code is required').not().isEmpty(),
    check('address', 'address is required').not().isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more Character'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      organisation_name,
      owner_name,
      organisation_register_number,
      email_id,
      phone_number,
      organisation_type,
      state,
      location,
      pin_code,
      address,
      password,
    } = req.body;

    try {
      // see if Vender exists
      let vender = await Vender.findOne({ email_id });

      if (vender) {
        return res
          .status(400)
          .json({ errors: [{ status: 0, msg: 'Vender already exists' }] });
      }

      vender = new Vender({
        organisation_name,
        owner_name,
        organisation_register_number,
        email_id,
        phone_number,
        organisation_type,
        state,
        location,
        pin_code,
        address,
        password,
      });

      //Encrypt password

      const salt = await bcrypt.genSalt(10);

      vender.password = await bcrypt.hash(password, salt);

      await vender.save();

      //Return jsonwebtoken

      const payload = {
        vender: {
          id: vender.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            status: 1,
            message: 'Registered successfully',
            vender,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
