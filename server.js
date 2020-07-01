const express= require("express")
const app = express()
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser")
const cors = require('cors')

const signup = require("./api/signup")
const signin = require("./api/signin")
const otpsend = require("./api/fpass")
const otpverify = require('./api/verifyToken')
const updatePassword = require('./api/updatePassword')
const login = require('./api/login')

 app.all('/*', function (req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
     res.header("Access-Control-Allow-Methods", "GET, POST", "PUT");
     next();
   });
  

app.use(cors())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())

app.use('/api/login', login)
app.use('/api/passupdate', updatePassword)
app.use('/api/signup', signup)
app.use('/api/signin', signin)
app.use('/api/otpsend', otpsend)
app.use('/api/verify', otpverify)


app.listen( port, ()=>{ console.log(`The Server is working on ${port}....`) } )