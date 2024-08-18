import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom'; // Changed from useNavigate
import axios from 'axios';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    
    const history = useHistory(); // Changed from useNavigate

    // Basic email validation
    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
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
            // Assuming your backend is running on port 5000
            const response = await axios.post('http://localhost:5000/auth/signup', {
                name,
                email,
                password
            });

            if (response.data) {
                history.push('/login'); // Redirect to login page on success
            }
        } catch (err) {
            setError(
                err.response?.data?.message || 
                "Signup failed. Please try again later."
            );
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Sign Up
            </Typography>
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            <form onSubmit={handleSignup}>
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
                    type="email"
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
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Sign Up
                </Button>
            </form>
        </Container>
    );
};

export default SignupPage;
