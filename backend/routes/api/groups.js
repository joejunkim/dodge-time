const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async (req, res) => {
    const groups = await db.Group.findAll();
    res.json(groups);
}));

router.post('/', asyncHandler(async (req, res) => {
    const id = await db.Group.create(req.body);
    res.json(id)
    // return res.redirect("/");
}));

module.exports = router;
