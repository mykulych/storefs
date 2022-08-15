const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/constants', require('./constants.routes'))
router.use('/auth', require('./auth.routes'))
router.use('/ads', require('./ads.routes'))
router.use('/comments', require('./comments.routes'))
router.use('/users', require('./users.routes'))

module.exports = router
