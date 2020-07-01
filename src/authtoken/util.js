import axios from 'axios';


export default function authToken(token) {

    
   if (token) {
        console.log("Yes, token is sett to auth header");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    }
    else {
        console.log("token is deleted")
        localStorage.clear();
        delete axios.defaults.headers.common["Authorization"];
    }
}


