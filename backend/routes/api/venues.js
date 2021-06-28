const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async (req, res) => {
    const venues = await db.Venue.findAll();
    res.json(venues);
}));

module.exports = router;
