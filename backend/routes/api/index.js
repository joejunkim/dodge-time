const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const groupsRouter = require('./groups')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/groups', groupsRouter)

module.exports = router;
