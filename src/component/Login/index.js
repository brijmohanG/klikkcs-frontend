import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './index.css';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://klikkcs-2.onrender.com/api/login', {
                password,
                email
            });

            // Assuming your API returns the token in response.data.token
            const token = response.data.token;

            // Store JWT in cookie (expires in 7 days)
            Cookies.set('jwt_token', token, { expires: 7 });

            console.log('Login successful!');
            // Redirect or show logged-in UI

        } catch (error) {
            console.error('Login failed:', error);
            setErrorMsg(error?.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {errorMsg && <p className="error-msg">{errorMsg}</p>}

                <button type="submit" className="login-button">Login</button>

                <p className="register-redirect">
                    Don't have an account? <button className="register-button" onClick={() => (window.location.href = '/registration')}>Register</button>
                </p>
            </form>
        </div>
    );
}

