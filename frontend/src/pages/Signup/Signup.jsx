import { useState } from "react";
import useSignup from "../../hooks/useSignup.js";
import { useNavigate, NavLink } from "react-router-dom";
import "./Signup.css"

const Signup = () => {
    const [input, setInput] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const { signup } = useSignup();

    const navigateTo = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInput(prevUser => ({ 
            ...prevUser, 
            [name]: value,
        }))
    };
    
    const handleSubmit = async () => {
        await signup(input);
        navigateTo('/');
    }

    return (
        <div className="signup">
            <div className="signup-card">
            <h1>Join <span className="signup-logo">FoodWars</span></h1>
            <div>
                <div>
                    <p>user name</p>
                    <input className="signup-input" name="username" value={input.username} onChange={handleChange} />
                </div>
                <div>
                    <p>password</p>
                    <input className="signup-input" name="password" value={input.password} onChange={handleChange} />
                </div>
                <div>
                    <p>confirm password</p>
                    <input className="signup-input" name="confirmPassword" value={input.confirmPassword} onChange={handleChange} />
                </div>
                <div className="signup-button-container">
                    <button onClick={handleSubmit}>create an account</button>
                </div>
                <div className="signup-link-container">
                <NavLink to="/login">already have an account?</NavLink>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Signup;
