const express = require('express');
const Router = express.Router(express)
const nodemailer = require('nodemailer');
const rn = require('random-number');
const bringSchema = require('./usermodel');
const fpassmodel = require('./fpassmodel')
const url ='mongodb+srv://ritiksangwan:ritik@learningcluster-tcjx5.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose')
mongoose.connect(url, {useNewUrlParser: true , useUnifiedTopology: true })


Router.post("/", function (req, res) {
  const clientMail = req.body.email;
  bringSchema.findOne( {email: clientMail }).then( (user)=>{
    if(!user){ res.status(206).send({ message: "Wrong email or user not registered"  }) }
    else{


      console.log(clientMail);
      var options = {
        min: 12529,
        max: 91759,
        integer: true
      }
      const otpGen = rn(options) + '';
      console.log(otpGen)
      // Generate SMTP service account from ethereal.email
      nodemailer.createTestAccount((err, account) => {
        if (err) {
          console.error('Failed to create a testing account. ' + err.message);
          return process.exit(1);
        }
    
        console.log('Credentials obtained, sending message...');
    
        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'ritiksangwan155@gmail.com',
            pass: 'Root111000'
          }
        });
    
        // Message object
        let message = {
          from: 'ritiksangwan155@gmail.com',
          to: clientMail,
          subject: 'OTP todo',
          text: 'Sent successfully',
          html: otpGen
        };
    
        transporter.sendMail(message, (err, info) => {
          if (err) {
            console.log('Error occurred. ' + err.message);
            res.status(500).send({ message: "Service not working at this moment, try again after sometime" })
            return process.exit(1);
          }

         
          console.log("otp sent")
          var mymodel= new fpassmodel({
            otp:otpGen,
            email:clientMail
          })


         mymodel.save().then( (doneresponse)=>{ res.status(200).send({});   console.log("OTP saved")   })
          
         .catch(err=>{console.log(err)})

          //console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
      });
   }
    })
  .catch(err=>{console.log(err)})

})

module.exports = Router;





