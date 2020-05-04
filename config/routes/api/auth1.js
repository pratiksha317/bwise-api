const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth1');
const Vender = require('../../../models/Vender');

// @route    POST api/auth
// @desc     Login Vender
// @access   Public
router.post(
  '/',
  [
    check('email_id', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email_id, password } = req.body;

    try {
      let vender = await Vender.findOne({ email_id });

      if (!vender) {
        return res
          .status(400)
          .json({ errors: [{ status: 0, msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, vender.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ status: 0, msg: 'Invalid Credentials' }] });
      }

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
          res.json({ status: 1, message: 'login Successfully', token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
