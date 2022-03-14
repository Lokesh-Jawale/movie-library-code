import React, {useState, useEffect} from 'react';
import "./Login.css";
import bg1 from "../../images/bg1.jpg";
import axios from 'axios';
import {loginUser} from '../../utils/apiCalls';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '../../features/appDataSlice';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    const login = (e) => {
        e.preventDefault();
        loginUser({email, password})
        .then((res) => {
            if(res.status === 200){
                localStorage.setItem("user", JSON.stringify(res));
                dispatch(saveUser(res));
                alert("User Logged in Successfully")
                history.push("/");
            }
            else {
                alert("User Failed to login")
                console.log(res.data)
            }
        })
        .catch((err) => {
            alert("User Failed to login")
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
            <form className="form" onSubmit={login}>
                <h1>Movie Library</h1>
                <div className="email">
                    <label>Email Id: </label>   
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} /> 
                </div>
                <div className="password">
                    <label>Password : </label>   
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} /> 
                </div>
                <button>Sign in </button>
            </form>
        </div>
    )
}

export default Login;