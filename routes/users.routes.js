const express = require('express')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
  try {
    const data = await User.find() 
    res.status(200).send(data)
  } catch(error) {
    res.status(500).json({ message: `Server error: ${error}` })
  }
})

router
  .route('/:_id')
  .get(async (req, res) => {
    try {
      const { _id } = req.params
      const user = await User.findOne({ _id }) 
      res.status(200).send(user)
    } catch(error) {
      res.status(500).json({ message: `Server error: ${error}` })
    }
  })
  .patch(auth, async (req, res) => {
    try {
      const { _id } = req.params

      if (_id !== req.user._id) {
        return res.status(403).json({ error: { message: 'FORBIDDEN_USER', code: 403 } })
      }

      const user = await User.findOne({ _id })
      if (!user) {
        return res.status(404).json({ error: { message: 'USER_NOT_FOUND', code: 404 } })
      }

      const updatedUser = await User.findByIdAndUpdate(_id, req.body, { new: true })
      
      res.send(updatedUser)
    } catch(error) {
      res.status(500).json({ message: `Server error: ${error}` })
    }
  })

module.exports = router
