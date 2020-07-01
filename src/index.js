import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './dashboard'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware} from 'redux';
import { SET_CURRENT_USER } from './action/action'
import  authToken  from './authtoken/util'
import jwt from 'jsonwebtoken'
import { setCurrentUser } from './authAction/authAction'

//import Fpass from './components/Fpass';

 const initialState={
     isAuthenticated:false,
     user:{},
     loading:false
 }


 function reducer(state=initialState, action){
     switch(action.type){
         case SET_CURRENT_USER:
             return {
                 isAuthenticated: true,
                 user: action.user
                 }
         default:
             return state;
     }
 }

 const store=createStore(reducer, applyMiddleware(thunk));

 if(localStorage.jwtToken){
     console.log("Yes it workied......")
    authToken(localStorage.jwtToken)
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
}




 ReactDOM.render(<Provider store={store}><Navbar /></Provider> , document.getElementById('root'));
//ReactDOM.render(<Fpass />,document.getElementById('root'));