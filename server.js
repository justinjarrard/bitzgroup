require('dotenv').config()
const http = require('http')
const cors = require('cors')
const express = require('express')
const { join } = require('path')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

const app = express()
const server = http.createServer(app)
const { User } = require('./models')

app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, ({ id }, cb) => User.findById(id)
  .populate('posts')
  .populate('comments')
  .populate('messages')
  .populate('friends')
  .then(user => cb(null, user))
  .catch(err => cb(err))))

app.use(require('./routes'))

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'client', 'build', 'index.html'))
})

require('./db')
  .then(() => app.listen(process.env.PORT || 3001))
  .catch(err => console.log(err))