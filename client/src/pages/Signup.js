import React from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'



export default function Signup()
{

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if(!email || !password || !confirmPassword)
        {
            setError("Please fill in all fields");
            return;
        }

        const response = await fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await response.json();
        
        if (data.status === "ok") {
            navigate("/login");
        } else {
            setError(data.error);
        }
    }


    return(
        <div className="signup-page">
            <div className = "signup-box">
                <h1>Cognify</h1>
                <h2>Sign Up</h2>
                <form className = "signup-form" onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        className = "username-input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Password</label>
                    <input
                        className = "password-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>Confirm Password</label>
                    <input
                        className = "password-input"
                        type="password"
                        value = {confirmPassword}
                        onChange = {(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <div className = "signup-button-container">
                        <button className = "signup-button">Sign Up</button>
                    </div>
                    {error && <div className="error">{error}</div>}
                </form>
                <div className = "login-redirect">Already have an account? <Link to="/login">Log in</Link></div>
            </div>
            
        </div>
    )
}

