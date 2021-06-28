const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const groupsRouter = require('./groups')
const eventsRouter = require('./events')
const userGroupsRouter = require('./userGroups')
const rsvpRouter = require('./rsvps');
const venuesRouter = require('./venues')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/groups', groupsRouter)
router.use('/events', eventsRouter)
router.use('/userGroups', userGroupsRouter)
router.use('/rsvps', rsvpRouter)
router.use('/venues', venuesRouter)

module.exports = router;
