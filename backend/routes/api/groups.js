const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async (req, res) => {
    const groups = await db.Group.findAll();
    res.json(groups);
}));

router.get(`/:groupId`, asyncHandler(async (req, res) => {
    const group = await db.Group.findByPk(groupId)
    res.json(group)
}))

router.post('/', asyncHandler(async (req, res) => {
    const id = await db.Group.create(req.body);
    res.json(id)
}));

module.exports = router;
