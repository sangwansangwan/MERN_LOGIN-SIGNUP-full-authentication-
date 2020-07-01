const mongoose = require('mongoose')

const usrmodel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  
})

module.exports = mongoose.model('prduction', usrmodel )
