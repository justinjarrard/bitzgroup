const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')

router.get('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.find({})
    .populate('author')
    .populate('comments')
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

router.get('/posts/user/:id', passport.authenticate('jwt'), (req, res) => {
  Post.find({ author: req.params.id })
    .populate('author')
    .populate('comments')
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

router.post('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.create({
    post_content: req.body.post_content,
    author: req.user._id,
    post_date: Date.now()
  })



module.exports = router