const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.get('/:myId', asyncHandler(async (req, res) => {
    const { myId } = req.params
    const userGroups = await db.UserGroup.findAll({
        where: { userId: myId }
    });
    res.json(userGroups);
}));

router.post('/', asyncHandler(async (req, res) => {
    const newUserGroup = await db.UserGroup.create(req.body)
    res.json(newUserGroup);
}))

router.delete('/', asyncHandler(async (req, res) => {
    const userId = req.body.userId;
    const groupId = req.body.groupId;
    await db.UserGroup.destroy({
        where: {
            userId: userId,
            groupId: groupId
        }
    })
    res.json()
}))

module.exports = router;
