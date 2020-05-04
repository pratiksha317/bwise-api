const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../../middleware/auth1');
const Vender = require('../../../models/Vender');
const Dance = require('../../../models/Dance');
const { check, validationResult } = require('express-validator');

//@route GET api/dance/vender/vender_id
//@desc  Get dance by vender Id
//access  Public

router.post(
  '/',
  [check('vender_id', 'vender_id is required').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
  }
);

module.exports = router;
