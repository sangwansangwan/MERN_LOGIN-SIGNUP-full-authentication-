const express = require('express')
const Router = express.Router()


Router.get('/',function(req,res){

    console.log(req.headers)

})