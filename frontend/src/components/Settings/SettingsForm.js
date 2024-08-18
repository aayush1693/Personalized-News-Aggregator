import React, { useContext, useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { AppContext } from '../../context/AppContext';
import apiService from '../../services/apiService';

const SettingsForm = () => {
    const { userPreferences, setUserPreferences } = useContext(AppContext);
    const [preferences, setPreferences] = useState(userPreferences || {});

    useEffect(() => {
        setPreferences(userPreferences);
    }, [userPreferences]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPreferences({ ...preferences, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedPreferences = await apiService.updatePreferences(preferences);
            setUserPreferences(updatedPreferences);
        } catch (error) {
            console.error('Error updating preferences:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5">Manage Preferences</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Preferred Categories"
                        name="categories"
                        value={preferences.categories || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Preferred Sources"
                        name="sources"
                        value={preferences.sources || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Save Preferences
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default SettingsForm;