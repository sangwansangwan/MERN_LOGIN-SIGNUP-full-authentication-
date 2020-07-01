const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')
const bringSchema = require('./usermodel')
const bcrypt = require('bcrypt')
const url = 'mongodb+srv://ritiksangwan:ritik@learningcluster-tcjx5.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

Router.put('/', function (req, res) {

    const mail = req.body.email;
    let password = req.body.password;


    bcrypt.hash( password, 10, function(err, hash){
        bringSchema.findOneAndUpdate({ email: mail }, { $set: { password: hash } }).then(user => {
            res.status(200).send()
        })
    })

    



})

module.exports = Router;