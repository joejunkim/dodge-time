const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/', asyncHandler(async (req, res) => {
    const { myId } = req.params
    const rsvps = await db.RSVP.findAll({
        where: { userId: myId }
    });
    res.json(rsvps);
}));

router.post('/', asyncHandler(async (req, res) => {
    const newRSVP = await db.RSVP.create(req.body)
    res.json(newRSVP);
}))

router.delete('/', asyncHandler(async (req, res) => {
    const userId = req.body.userId;
    const eventId = req.body.eventId;
    await db.RSVP.destroy({
        where: {
            userId: userId,
            eventId: eventId
        }
    })
    res.json()
}))

module.exports = router;
