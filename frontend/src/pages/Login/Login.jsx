import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin.js";
import "./Login.css"

const Login = () => {
    const [input, setInput] = useState({
        username: '',
        password: '',
    })

    const navigateTo = useNavigate();
    const { login } = useLogin();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInput(prevUser => ({ 
            ...prevUser, 
            [name]: value,
        }))
    };
    
    const handleSubmit = async () => {
        await login(input.username, input.password);
        navigateTo('/')
    }

    return (
        <div className="login">
            <div className="login-card">
            <h1>Welcome Back!</h1>
            <div>
                <div>
                    <p>user name</p>
                    <input className="login-input" name="username" value={input.username} onChange={handleChange} />
                </div>
                <div>
                    <p>password</p>
                    <input className="login-input" name="password" value={input.password} onChange={handleChange} />
                </div>
                <div className="login-button-container">
                    <button onClick={handleSubmit}>login</button>
                </div>
                <div className="login-navlink-container">
                <NavLink to="/signup">{"don't"} have an account?</NavLink>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login;
