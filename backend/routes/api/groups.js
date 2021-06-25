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
}));

router.put(`/:groupId`, asyncHandler(async (req, res) => {
    const groupId = req.params.groupId;
    await db.Group.update(req.body,
        { where: { id: groupId } })
    res.json(groupId);
}))

router.delete(`/:groupId`, asyncHandler(async (req, res) => {
    const groupId = req.params.groupId;
    await db.Group.destroy({ where: { id: groupId }});
    res.json(groupId);
}));

module.exports = router;
