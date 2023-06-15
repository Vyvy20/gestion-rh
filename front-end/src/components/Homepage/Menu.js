import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { CONNECTION, DISCONNECT } from '../../api/connectionApi.js';
import {
  Button,
  Box,
  Toolbar,
  Typography,
  TextField,
  AppBar,
  Snackbar,
  Alert,
} from '@mui/material';
import Image from 'mui-image';
import { UserContext } from '../../page/Interface.js';

const logoEnt = new URL('../../images/Logo.png', import.meta.url);

function Menu({ setUser }) {
  const user = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [connect, { loading, error }] = useMutation(CONNECTION, {
    onCompleted: (data) => {
      setUser(data.connect);
      localStorage.setItem('token', data.connect.token);
      localStorage.setItem('role', data.connect.role);
      localStorage.setItem('id', data.connect.id);
      setSuccessSnackbarOpen(true);
    },
  });

  const [disconnect, { loading2, error2 }] = useMutation(DISCONNECT, {
    onCompleted: () => {
      setUser();
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      setDisconnectSnackbarOpen(true);
    },
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [disconnectSnackbarOpen, setDisconnectSnackbarOpen] = useState(false);

  if (loading || loading2) {
    return <Typography>loading...</Typography>;
  }
  if (error || error2) {
    return <Typography>{error.message}</Typography>;
  }

  const handleConnect = (event) => {
    event.preventDefault();
    if (email.trim() === '' || pwd.trim() === '') {
      setSnackbarOpen(true);
      return;
    }
    connect({ variables: { email: email, password: pwd } });
  };

  const handleDisconnect = (event) => {
    event.preventDefault();
    disconnect();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessSnackbarOpen(false);
  };

  const handleDisconnectSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setDisconnectSnackbarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Image src={logoEnt} alt="logo" width={90} />
          {!user && (
            <Box sx={{ alignSelf: 'center' }}>
              <TextField
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextField
                type="Password"
                label="Mot de passe"
                variant="outlined"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
              />
            </Box>
          )}
          {user && (
            <Typography variant="h6" sx={{ alignSelf: 'center' }}>
              Bonjour Madame/Monsieur
            </Typography>
          )}
          <Button
            className="btnConnect"
            color="inherit"
            onClick={user ? handleDisconnect : handleConnect}
          >
            {user ? 'Déconnexion' : 'Connexion'}
          </Button>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          Les champs d'entrée ne peuvent pas être vides.
        </Alert>
      </Snackbar>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleSuccessSnackbarClose}
      >
        <Alert onClose={handleSuccessSnackbarClose} severity="success">
          Connexion réussie !
        </Alert>
      </Snackbar>
      <Snackbar
        open={disconnectSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleDisconnectSnackbarClose}
      >
        <Alert onClose={handleDisconnectSnackbarClose} severity="success">
          Déconnexion réussie !
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Menu;
