import React from 'react';
import '../style/main.css';
import '../style/util.css';
import authToken from '../authtoken/util'

class Loggedin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "testing"
        }
    this.handleClick=this.handleClick.bind(this)
    }

 handleClick(e){
 e.preventDefault()
 authToken()
 }



    render() {
        return (
            <div>
                <div className="login-title">
                    <div className="navigation">
                        <span className="buttonLogout" href="">
                            <div className="imug">
                                <div className="backImage" ></div>
                            </div>
                                <form onSubmit={this.handleClick}>
                            <button className="logout"   >LOGOUT</button>
                            </form>
                        </span>
                    </div>
                </div>


                <div className="container-login100" >
                    {this.props.name} is logged in.....
                    </div>
            </div>
        )
    }
}



export default Loggedin;
