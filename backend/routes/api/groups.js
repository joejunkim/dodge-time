const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

// const { Group } = require('../../db/models')
const db = require('../../db/models')

router.get('/', asyncHandler(async (req, res) => {
    const groups = await db.Group.findAll();
    res.json(groups);
}));

module.exports = router;
