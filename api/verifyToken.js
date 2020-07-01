const express = require('express')
const Router = express.Router()
const fpassmodel = require('./fpassmodel')
const url = 'mongodb+srv://ritiksangwan:ritik@learningcluster-tcjx5.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose')
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


Router.post("/", function (req, res) {
    console.log("Asdf")
    const mail = req.body.email;
    const otpVer = req.body.otp;
    console.log(mail, otpVer)
    fpassmodel.findOne({ email: mail, otp: otpVer }).then(user => {
        if (user) {
            res.status(200).send();
            console.log("valid otp matched")
       }
        else { res.status(201).send({ message: "Invalid  OTP"}) 
        console.log("invalid otp")}
    })

});

module.exports = Router;
