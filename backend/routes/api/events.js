const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async (req, res) => {
    console.log('----------->>>>>>')
    const events = await db.Event.findAll();
    res.json(events);
}));

module.exports = router;
