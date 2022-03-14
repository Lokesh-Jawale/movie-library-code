import React, {useState, useEffect} from 'react';
import "./Register.css";
import bg1 from "../../images/bg1.jpg";
import axios from 'axios';
import {registerUser} from '../../utils/apiCalls';
import { useHistory } from "react-router-dom";

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const register = (e) => {
        e.preventDefault();
        registerUser({email, password})
        .then((res) => {
            if(res.status === 200){
                alert("User Registered Successfully")
                history.push("/login");
            }
            else {
                alert("User Failed to register")
                console.log(res.data)
            }
        })
        .catch((err) => {
            alert("User Failed to register")
            console.log(err);
        })
    }

	const backgroundStyle = {
		backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg1})`,
		backgroundSize: "cover",
		height: "100vh"
	}

    return (
        <div className="login" style={backgroundStyle}>
            <form className="form" onSubmit={register}>
                <h1>Movie Library</h1>
                <div className="email">
                    <label>Email Id: </label>   
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} /> 
                </div>
                <div className="password">
                    <label>Password : </label>   
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} /> 
                </div>
                <button>Register </button>
            </form>
        </div>
    )
}

export default Register;