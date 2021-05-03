const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// POST route that creates a new user through passport and creates a salt and hash for it
router.post('/users/register', (req, res) => {
  const { name, email, username } = req.body
  User.register(new User({ name, email, username }), req.body.password,
  err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

// POST route that authenticates the user's login with their username and password and send back a token if succesful
router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) =>
  {
    if (err) { console.log(err) }
    console.log(req.body)
    console.log(user)
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})

// GET route to grab the user and requires a token
router.get('/users', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user)
})

// GET router to grab all users
router.get('/users/all', passport.authenticate('jwt'), (req, res) => {
  User.find({})
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

// DELETE rote to delete the currently signed in user
router.delete('/users', passport.authenticate('jwt'), (req, res) => {
  User.findByIdAndDelete(req.user._id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})


module.exports = router