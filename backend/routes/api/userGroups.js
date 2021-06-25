const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const db = require('../../db/models')

router.put('/', asyncHandler(async (req, res) => {
}))

module.exports = router;
