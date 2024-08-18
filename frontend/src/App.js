import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import BookmarksPage from './pages/BookmarksPage';
import SettingsPage from './pages/SettingsPage';
import NavBar from './components/Navigation/NavBar';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import apiService from './services/apiService';

const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
    primary: {
      main: '#d3d3d3',
    },
    secondary: {
      main: '#a9a9a9',
    },
  },
});

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <>
            <NavBar />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

function App() {
  const { setUser } = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiService.getUserData(token)
        .then(response => {
          setUser(response.user);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [setUser]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/reset-password" component={ResetPasswordPage} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <PrivateRoute path="/bookmarks" component={BookmarksPage} />
          <PrivateRoute path="/settings" component={SettingsPage} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;