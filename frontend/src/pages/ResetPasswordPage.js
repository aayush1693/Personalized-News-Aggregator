import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/reset-password', { email });
            setMessage('Password reset link sent to your email.');
        } catch (err) {
            setMessage('Failed to send reset link. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Reset Password
            </Typography>
            {message && <Typography color="error">{message}</Typography>}
            <form onSubmit={handleResetPassword}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Send Reset Link
                </Button>
            </form>
        </Container>
    );
};

export default ResetPasswordPage;