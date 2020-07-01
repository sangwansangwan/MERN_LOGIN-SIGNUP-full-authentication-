const express = require('express')
const Router = express.Router()
const mongoose = require ('mongoose')
const bcrypt = require ('bcrypt')
const bringSchema = require('./usermodel')



const url = 'mongodb+srv://ritiksangwan:ritik@learningcluster-tcjx5.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true , useUnifiedTopology: true })

Router.post('/',function(req,res){
var datato = req.body;

bringSchema.findOne( {email: datato.email}).then(function(user){  
    console.log(" one ")
    if(user){
    return (res.status(200).send({ message: 'used same id' }))}
    else{
        
            bcrypt.hash( datato.password, 10, function(err, hash ){
                var mynewmodel = new bringSchema ({
                    name: datato.username,
                    email: datato.email,
                    password: hash
                })
                
              
                mynewmodel.save().then( (doneresponse)=>{ if(doneresponse){ res.status(200).send({ message: 'अतिथि देवो भव' })   }; console.log("User Saved")   }   )
                .catch( (e)=>{ res.json({ message: e  })   }  )
            })
    }
})
 })



module.exports = Router