const express = require('express');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const Vender = require('../../../models/Vender');
const Playarea = require('../../../models/Playarea');
const { check, validationResult } = require('express-validator');

//@route GET api/playarea/me
//@desc  Get current playarea data
//access  Private

router.get('/me', auth, async (req, res) => {
  try {
    const playarea = await Playarea.findOne({ vendr: req.vender.id });
    if (!playarea) {
      return res
        .status(400)
        .json({ msg: 'There is no data for this playarea' });
    }
    res.json(playarea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route POST api/playarea
//desc Create or update playarea data
//@access Public

router.post(
  '/',
  [
    auth,
    [
      check('name', 'name is required').not().isEmpty(),
      check('organisation_name', 'organisation_name is required')
        .not()
        .isEmpty(),

      check('entry_fee', 'entry_fee is required').not().isEmpty(),
      check('weekday_rate', 'weekday_rate is required').not().isEmpty(),
      check('weekend_rate', 'weekend_rate is required').not().isEmpty(),

      check('offers', 'offers is required').not().isEmpty(),
      check('packages', 'packages is required').not().isEmpty(),
      check('state', 'state is required').not().isEmpty(),

      check('location', 'location is required').not().isEmpty(),
      check('pin_code', 'pin_code is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),

      check('landline_number', 'phone_number is required').not().isEmpty(),
      check('address', 'address is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      organisation_name,
      entry_fee,
      weekday_rate,
      weekend_rate,
      offers,
      facilities,
      bonus_features,
      packages,
      book_requirements,
      food,
      music,
      screen,
      kids_friendly,
      products_and_service_offered,
      brances,
      state,
      location,
      pin_code,
      phone_number,
      landline_number,
      address,
    } = req.body;

    // Build Playarea Object
    const playareaFeild = {};
    playareaFeild.vender = req.vender.id;
    if (name) playareaFeild.name = name;
    if (organisation_name) playareaFeild.organisation_name = organisation_name;
    if (entry_fee) playareaFeild.entry_fee = entry_fee;
    if (weekday_rate) playareaFeild.weekday_rate = weekday_rate;
    if (weekend_rate) playareaFeild.weekend_rate = weekend_rate;
    if (offers) playareaFeild.offers = offers;
    if (facilities) playareaFeild.facilities = facilities;
    if (bonus_features) playareaFeild.bonus_features = bonus_features;
    if (packages) playareaFeild.packages = packages;
    if (book_requirements) playareaFeild.book_requirements = book_requirements;

    if (food) playareaFeild.food = food;
    if (music) playareaFeild.music = music;
    if (screen) playareaFeild.screen = screen;
    if (kids_friendly) playareaFeild.kids_friendly = kids_friendly;
    if (products_and_service_offered)
      playareaFeild.products_and_service_offered = products_and_service_offered;
    if (brances) playareaFeild.brances = brances;
    if (state) playareaFeild.state = state;
    if (location) playareaFeild.location = location;
    if (pin_code) playareaFeild.pin_code = pin_code;
    if (phone_number) playareaFeild.phone_number = phone_number;

    if (landline_number) playareaFeild.landline_number = landline_number;
    if (address) playareaFeild.address = address;

    try {
      let playarea = await Playarea.findOne({ vender: req.vender.id });

      if (playarea) {
        //Update
        playarea = await Playarea.findOneAndUpdate(
          { vender: req.vender.id },
          { $set: playareaFeild },
          { new: true }
        );

        return res.json({
          status: 1,
          message: 'Data updated successfully',
          data: playarea,
        });
      }

      //Create
      playarea = new Playarea(playareaFeild);

      await playarea.save();
      return res.json({
        status: 1,
        message: 'Data added successfully',
        data: playarea,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route GET api/playarea
//@desc  Get all playareas
//access  Public

router.get('/', async (req, res) => {
  try {
    const playarea = await Playarea.find();
    return res.json({
      status: 1,
      message: 'success',
      data: playarea,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
module.exports = router;

//@route GET api/school/vender/vender_id
//@desc  Get school by User Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const playarea = await Playarea.findOne({
      vender: req.params.vender_id,
    });

    if (!playarea)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: playarea,
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

  Playarea.find(
    {
      location: query,
    },
    function (err, playarea) {
      if (err) throw err;
      if (playarea) {
        res.json(playarea);
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
