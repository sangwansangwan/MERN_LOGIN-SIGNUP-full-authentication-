import React, { Component } from 'react';
import Popup from "reactjs-popup";
import '../style/main.css'
import '../style/util.css';
import { Link } from 'react-router-dom'
import validator from 'validator';
import axios from 'axios';

class Fpass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "t@gmail.com",
            otp: "",
            exists: false,
            matchedOTP: false,
            password:"",
            cpassword:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitOTP = this.handleSubmitOTP.bind(this);
        this.handlePasswordupdate=this.handlePasswordupdate.bind(this);
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }


    handleSubmit(event) {
        event.preventDefault();
        if (validator.isEmail(this.state.email)) {
            axios.post('http://localhost:5000/api/otpsend', this.state).then((res) => {
            
            if (res.status === 200) {
                    this.setState({ exists: true })
                }
                 else {
                     console.log(res.status)
                    alert(res.data.message)
                }
            })
            
                .catch((err) => { console.log(err) })
         }
               else {
            alert("Invalid email")
        }
    }


    handleSubmitOTP(event) {
        event.preventDefault();
        
        axios.post('http://localhost:5000/api/verify',this.state).then(res=>{ 
        console.log(res)    
        if(res.status === 200){
                this.setState({ matchedOTP:true, exists:false })
    
            }
            else{
                alert(res.data.message)
            }


         }  ).catch(err=>{ console.log(err) })
    }


    handlePasswordupdate(event){
        event.preventDefault();
        if(this.state.password!==this.state.cpassword){
            alert("Passwords are not matching")
        }
        else{
        axios.put("http://localhost:5000/api/passupdate", this.state).then(res=>{
            if(res.status === 200){
                alert("Password Updated")
                this.setState({ matchedOTP:false})
            }
        }).catch(err=>{console.log(err)})
            
        }
    }
    




    render() {
        console.log(this.state) // consoling the state of forgot password component
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        
                        <div className="fpass100-form-title">
                            <span className="login100-form-title-1">
                                Password Recovery
                            </span>
                        </div>

                        <form onSubmit={this.handleSubmit} className="login100-form validate-form">
                            <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                <span className="label-input100">Email</span>
                                <input className="input100" onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="Enter email" />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">Send OTP</button>
                            </div>

                            <Link className="txt4" to="/signup">
                                Sign Up
                            </Link>
                        </form>


                        <Popup open={this.state.exists} closeOnDocumentClick onClose={this.closeModal}>
                            {close => (
                                <div className="modal">
                                    <div className="close" onClick={()=>{  this.setState({ exists:false })}}> &times; </div>
                                    <div className="header"> Verify Token </div>
                                    <div className="content">
                                        {" "}

                                        <form onSubmit={this.handleSubmitOTP}>
                                            <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                                <span className="label-input100">OTP:</span>
                                                <input className="input100" onChange={this.handleChange} type="text" name="otp" value={this.state.otp} placeholder="OTP" />
                                                <span className="focus-input100"></span>
                                            </div>
                                            
                                            <div className="container-login900-form-btn">
                                                <button className="login900-form-btn">Verify OTP</button>
                                             </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </Popup>
                  
                  

                        <Popup open={this.state.matchedOTP} closeOnDocumentClick onClose={this.closeModal}>
                            {close => (
                                <div className="modal">
                                    <div className="close" onClick={()=>{  this.setState({ matchedOTP:false })}}> &times; </div>
                                    <div className="header"> Change Password </div>
                                    <div className="content">
                                        {" "}

                                        <form onSubmit={this.handlePasswordupdate}>


                                            <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                                <span className="label-input100">Password: </span>
                                                <input className="input100" onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="Password" />
                                                <span className="focus-input100"></span>
                                            </div>


                                            <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                                <span className="label-input100">Confirm Password: </span>
                                                <input className="input100" onChange={this.handleChange} type="password" name="cpassword" value={this.state.cpassword} placeholder="Confirm Password" />
                                                <span className="focus-input100"></span>
                                            </div>



                                            <div className="container-login900-form-btn">
                                                <button className="login900-form-btn">Update Password</button>
                                             </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </Popup>


                  
                  </div>
                </div>
            </div>
        )
    }
}





export default Fpass;