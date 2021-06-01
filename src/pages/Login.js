import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContex"
function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext)
    let history = useHistory()
    const login = () => {
        const data = { username: userName, password: password }
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({ username: response.data.username, id: response.data.id, status: true })
                history.push("/")

            }
        })
    }
    return (
        <div className="loginContainer">
            <label>User Name</label>
            <input type="text" onChange={(e) => { setUserName(e.target.value) }} />
            <label>Password</label>
            <input type="password" onChange={(e) => { setPassword(e.target.value) }} />
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login
