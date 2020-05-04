const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../../models/User');

//@route POST api/users
//@desc  Register User
//access  Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('mobileNo', 'Mobile Number is required').not().isEmpty(),
    check('email', 'Enter Valid Email').isEmail(),
    check('childName', 'Child Name Number is required').not().isEmpty(),
    check('age', 'age is required').not().isEmpty(),
    check('location', 'location is required').not().isEmpty(),
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
      name,
      mobileNo,
      email,
      childName,
      age,
      location,
      password,
    } = req.body;
    try {
      //See if User Exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ status: 0, msg: 'User already exists' }] });
      }

      user = new User({
        name,
        mobileNo,
        email,
        childName,
        age,
        location,
        password,
      });

      // //@route  PUT api/users/childInformation
      // //@desc   Add User childInformation
      // //access  Public

      // router.put(
      //   '/childInformation',
      //   [
      //     check('childName', 'Child Name Number is required').not().isEmpty(),
      //     check('age', 'age is required').not().isEmpty(),
      //   ],

      //   async (req, res) => {
      //     const errors = validationResult(req);
      //     if (!errors.isEmpty()) {
      //       return res.status(400).json({ errors: errors.array() });
      //     }

      //     const { childName, age } = req.body;

      //     try {
      //       const user = await User.findOne({ email });
      //       user.childInformation.unshift(newExp);
      //       await user.save();
      //       res.json(user);
      //     } catch (err) {
      //       console.error(err.message);
      //       res.status(500).send('Server Error');
      //     }

      //     const newExp = {
      //       childName,
      //       age,
      //     };
      //   }
      // );

      //Encrypt Password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //Return Json Webtoken

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ status: 1, message: 'Registered successfully', user });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
