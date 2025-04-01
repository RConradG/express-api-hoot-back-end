// controllers/hoots.js

const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Hoot = require("../models/hoot.js");
const router = express.Router();

// POST /hoots - CREATE Route "Protected"

router.post('/', verifyToken, async (req, res) => {
  try {
    req.body.author = req.user._id; // add the logged-in user's id to the author field
    const hoot = await Hoot.create(req.body);
    hoot._doc.author = req.user;
  } catch(error) {
    console.log(error); // TODO: remove this b4 prod
    res.status(500).json({error: error.message});
  };

});

router.get('/', verifyToken, async (req, res) => {
  try {
    const hoots = await Hoot.find({})
      .populate('author')
      .sort({createdAt: 'desc'});
    res.status(200).json(hoots);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
  };
});




module.exports = router;
