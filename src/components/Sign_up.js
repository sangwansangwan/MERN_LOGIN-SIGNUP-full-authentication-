import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../style/main.css'
import '../style/util.css';
import validator from 'validator';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            cpassword: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();
        if (validator.isEmail(this.state.email)) {
            if (this.state.password !== this.state.cpassword) {
                alert("Passwords are not matching")
            }

            else {
                console.log(this.state)
                axios.post("http://localhost:5000/api/signup", this.state).then(res => { alert(res.data.message) })
                    .catch(err => { console.error(err) })
            }
        }
        else {
            alert("Invalid Email")
        }
    }



    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }




    render() {
        return (
            <div className="limiter">
                {/* <div className="lds-ellipsis"><div></div><div></div><div></div></div>  */}
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="sign100-form-title">
                            <span className="sign100-form-title-1">
                                Sign Up
                            </span>
                        </div>
                        <form onSubmit={this.handleSubmit} className="login100-form validate-form">

                            <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                <span className="label-input100">Username</span>
                                <input className="input100" type="text" onChange={this.handleChange} value={this.state.username} name="username" placeholder="Enter username" />
                                <span className="focus-input100"></span>
                            </div>


                            <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                <span className="label-input100">Email</span>
                                <input className="input100" type="text" onChange={this.handleChange} value={this.state.email} name="email" placeholder="Enter email" />
                                <span className="focus-input100"></span>
                            </div>




                            <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                                <span className="label-input100">Password</span>
                                <input className="input100" type="password" onChange={this.handleChange} value={this.state.password} name="password" placeholder="Enter password" />
                                <span className="focus-input100"></span>
                            </div>


                            <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                <span className="label-input100">Confirm Password</span>
                                <input className="input100" type="password" onChange={this.handleChange} value={this.state.cpassword} name="cpassword" placeholder="Confirm password" />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button type="submit" className="login100-form-btn">
                                    Sign Up
        						</button>
                            </div>


                            <div className="txt3">Have an account?<Link className="txt2" to="/">Sign In</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>



        )
    }
}

export default Signup