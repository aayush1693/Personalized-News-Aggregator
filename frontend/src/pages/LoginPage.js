import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Link } from '@mui/material';
import { AppContext } from '../context/AppContext';
import { Link as RouterLink, useHistory } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AppContext);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            history.push('/dashboard'); // Redirect on success
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
            <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                Don't have an account? <Link component={RouterLink} to="/signup">Sign Up</Link>
            </Typography>
        </Container>
    );
};

export default LoginPage;