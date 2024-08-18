import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import apiService from '../../services/apiService';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(AppContext);
    const history = useHistory();

    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Validation checks
        if (!name.trim()) {
            setError("Name is required");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await apiService.signup({ name, email, password });
            if (response) {
                localStorage.setItem('token', response.token);
                history.push('/login'); // Redirect to login page on success
            }
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Please try again later.");
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" component="h1" gutterBottom>
                Sign Up
            </Typography>
            <form onSubmit={handleSignup}>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign Up
                </Button>
            </form>
        </Container>
    );
};

export default Signup;