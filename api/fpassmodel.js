const mongoose = require('mongoose')
const mymodell = new mongoose.Schema({
    otp:String,
    email:String,
    expire_at: {type: Date, default: Date.now, expires: 360} 
})

module.exports = mongoose.model('otp', mymodell )