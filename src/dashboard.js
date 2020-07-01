import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import Signin from './components/sign_in';
import Signup from './components/Sign_up';
import Fpass from './components/F_pass';
import Loggedin from './components/logged_in'
import { connect } from 'react-redux';
import axios from 'axios'
//import jwt from 'jsonwebtoken';
//import redirection from './components/redirect'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logIn: false,
            name: ""
        }
    }

    

    
    
    
    
    render() {
        console.log(this.props.daata.isAuthenticated)
        if (this.props.daata.isAuthenticated === true) {
            axios.post('http://localhost:5000/api/login').then(res => {
            console.log(res.data.message)
            if (res.status === 200) {
                    this.setState({ logIn: true, name: res.data.message })
                }
            })
                .catch(err => { console.log(err) })
        }




        return (

            <div>
                <BrowserRouter>
                    { (this.state.logIn === true) ? <Redirect to="/logged" /> : <Redirect to="/" />}

                        

                    <Route exact path="/" >
                        <Signin />
                    </Route>
                    <Route exact path="/signup" >
                        < Signup />
                    </Route>
                    <Route exact path="/fpass" >
                        <Fpass />
                    </Route>
                    <Route exact path="/redirect" >
                        <Fpass />
                    </Route>

                    <Route exact path="/logged" >
                        <Loggedin  name={this.state.name}  />
                    </Route>
                </BrowserRouter>

            </div>
        )
    }
}


function mapStatetoProps(state) {
    return {
        daata: state
    }
}


export default connect(mapStatetoProps)(Navbar);