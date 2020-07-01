const express = require('express')
const Router = express.Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bringSchema = require('./usermodel')
const url = 'mongodb+srv://ritiksangwan:ritik@learningcluster-tcjx5.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

Router.post('/', verifyToken, function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authdata) => {
        if (!authdata) {
            res.status(200).send({ message: "some error in token file, might be corrubted possibley" })
        }
        else {
            
            bringSchema.findOne({ email: authdata.jwtvar }).then((user) => { res.status(200).send({ message: user.name }); })
        }
    });
})


function verifyToken(req, res, next) {
    const dataInfo = req.headers['authorization'];
    if (dataInfo !== 'undefined') {
        const splitData = dataInfo.split(' ')
        const payloadData = splitData[1]
        console.log(payloadData)
        req.token = payloadData;
        next();
    } else {
        res.sendStatus(403);
        console.log('error while checking token')
    }
}




module.exports = Router;