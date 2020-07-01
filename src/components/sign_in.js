import React from 'react'
import '../style/main.css'
import '../style/util.css';
import { Link } from 'react-router-dom'
import { login } from '../authAction/authAction'
import { connect } from 'react-redux';
//import axios from 'axios';

class Signin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading:false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
     


    handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch(login(this.state))
        
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }



    render() {
    //console.log(this.props.daata) 
   return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
        
                        <div className="login100-form-title">
                            <span className="login100-form-title-1">
                                Sign In
                            </span>
                        </div>

                        <form onSubmit={this.handleSubmit} className="login100-form validate-form">

                            <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                <span className="label-input100">Email</span>
                                <input className="input100" onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="Enter email" />
                                <span className="focus-input100"></span>
                            </div>



                            <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                                <span className="label-input100">Password</span>
                                <input className="input100" type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Enter password" />
                                <span className="focus-input100"></span>
                            </div>



                             <div className="flex-sb-m w-full p-b-30">
						{/* <div className="contact100-form-checkbox">
							<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
							<label className="label-checkbox100" for="ckb1">
								Remember me
							</label>
						</div> */}
                        
                        
                        <Link className="txt2" to="/fpass">
                                  Forgot Password?
                        </Link>
                            </div>

					 






                            <div className="container-login100-form-btn">
                                <button type="submit" className="login100-form-btn">
                                    Login
						</button>
                            </div>


                            <div className="txt3">
                                don't have an account?
                        <Link className="txt2" to="/signup">
                                    Sign Up
                        </Link>
                            </div>



                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStatetoProps(state){
return {
    daata:state
    }
}


export default connect(mapStatetoProps)(Signin);
