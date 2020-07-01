import axios from 'axios';
import authToken from '../authtoken/util'
import jwt from 'jsonwebtoken'
import { SET_CURRENT_USER } from '../action/action';


export  function login(data){
    return (dispatch)=>{
        return axios.post('http://localhost:5000/api/signin/',data).then(res=> {
            alert(res.data.message)

             const token=res.data.token;
            if(token!==undefined){
            localStorage.setItem('jwtToken', token) 
            authToken(token);
            dispatch(setCurrentUser(jwt.decode(token)))
            }
            })
    }
}


export  function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user: user
    }
}