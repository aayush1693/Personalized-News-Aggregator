import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import apiService from '../../services/apiService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(AppContext);
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        
        try {
            console.log('Attempting login with:', { email });
            const response = await apiService.login({ email, password });
            console.log('Login response:', response);
            
            if (response.user) {
                setUser(response.user);
                history.push('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || error.message || 'Invalid email or password');
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h5" gutterBottom>Login</Typography>
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            <form onSubmit={handleLogin}>
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
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default Login;