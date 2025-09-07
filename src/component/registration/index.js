import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

export const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    // Store individual field errors here
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const errors = {};

        // Name validation (only letters, min 2 chars)
        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        } else if (!/^[A-Za-z]{2,}$/.test(formData.firstName.trim())) {
            errors.firstName = 'First name must be at least 2 letters and contain only alphabets';
        }

        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        } else if (!/^[A-Za-z]{2,}$/.test(formData.lastName.trim())) {
            errors.lastName = 'Last name must be at least 2 letters and contain only alphabets';
        }

        // Email validation using regex
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
        ) {
            errors.email = 'Invalid email address';
        }

        // Password validation (min 6 chars, at least one number and special char)
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        } else if (!/(?=.*[0-9])/.test(formData.password)) {
            errors.password = 'Password must contain at least one number';
        } else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
            errors.password = 'Password must contain at least one special character (!@#$%^&*)';
        }

        return errors;
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.name]: '' })); // clear error on change
        setSuccessMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear messages
        setSuccessMsg('');
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return; // stop submit if errors
        }

        setLoading(true);

        try {
            // Change URL below to your actual registration API
            const response = await axios.post('https://klikkcs-2.onrender.com/api/register', {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                password: formData.password,
            });
            setSuccessMsg(response.data.message);
            setFormData({ firstName: '', lastName: '', email: '', password: '' });
            setErrors({});
        } catch (error) {
            console.error('Registration error:', error);
            setSuccessMsg('');
            setErrors({ general: error.response?.data?.message || 'Registration failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Create an Account</h2>
            <form className="register-form" onSubmit={handleSubmit} noValidate>

                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    aria-describedby="firstNameError"
                />
                {errors.firstName && <p className="error-msg" id="firstNameError">{errors.firstName}</p>}

                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    aria-describedby="lastNameError"
                />
                {errors.lastName && <p className="error-msg" id="lastNameError">{errors.lastName}</p>}

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-describedby="emailError"
                />
                {errors.email && <p className="error-msg" id="emailError">{errors.email}</p>}

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    aria-describedby="passwordError"
                />
                {errors.password && <p className="error-msg" id="passwordError">{errors.password}</p>}

                {errors.general && <p className="error-msg">{errors.general}</p>}
                {successMsg && <p className="success-msg">{successMsg}</p>}

                <button type="submit" className="register-button" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p className="login-redirect">
                Already have an account?{' '}
                <button
                    type="button"
                    className="login-button"
                    onClick={() => (window.location.href = '/')}
                >
                    Login
                </button>
            </p>
        </div>
    );
};
