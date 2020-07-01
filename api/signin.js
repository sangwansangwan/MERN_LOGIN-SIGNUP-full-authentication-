const express = require('express')
const Router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const mongoose = require('mongoose')
const bringSchema = require('./usermodel')
const url ='mongodb+srv://ritiksangwan:ritik@learningcluster-tcjx5.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

Router.post("/",function(req,res){ 

    var reqdata= req.body;
    var jwtvar = reqdata.email;

    bringSchema.findOne( {email: reqdata.email }). then( (user)=>{
        if(!user){ res.status(200).send({ message: "Wrong email or user not registered"  }); console.log("Wrong email or user not registered")    }
        else{
            bcrypt.compare( reqdata.password, user.password, function(err, compans){
               if(compans==true){  
                   jwt.sign( {jwtvar}, 'secretkey', (err, token)=>{  res.status(200).send({ token:token, message: "Signed in successfully"   }); console.log("Signed in successfully")}     )
                   }
                   else{
                       res.status(200).send({ message: "Id is correct but password is wrong" }); console.log("Id is correct but password is wrong")
                   }
            })
        }
    })
 })

 module.exports = Router