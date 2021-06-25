const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async (req, res) => {
    const events = await db.Event.findAll();
    res.json(events);
}));

router.post('/', asyncHandler(async (req, res) => {
    const id = await db.Event.create(req.body);
    res.json(id)
}));

router.put(`/:eventId`, asyncHandler(async (req, res) => {
    const eventId = req.params.eventId;
    await db.Event.update(req.body,
        { where: { id: eventId } })
    res.json(eventId);
}))

router.delete(`/:eventId`, asyncHandler(async (req, res) => {
    const eventId = req.params.eventId;
    await db.Event.destroy({ where: { id: eventId }});
    res.json(eventId);
}));

module.exports = router;
