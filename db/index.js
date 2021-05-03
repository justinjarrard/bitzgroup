module.exports = require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/bitzgroup_db', {
  useNewUrlParser:true,
  useUnifiedTopology: true,
  useFindAndModify: false
})