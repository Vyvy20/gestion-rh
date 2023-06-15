import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ADD_EMPLOYE } from '../../api/employeApi';

export default function AddEmploye({ open, setOpen }) {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [poste, setPoste] = useState('');
  const [salaire, setSalaire] = useState('');
  const [password, setPassword] = useState('');
  const [jours, setJours] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const [addEmployes, { loading }] = useMutation(ADD_EMPLOYE);

  const handleClose = () => {
    setPrenom('');
    setNom('');
    setEmail('');
    setTelephone('');
    setPoste('');
    setSalaire('');
    setPassword('');
    setJours('');
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addEmployes({
      variables: {
        prenom,
        nom,
        email,
        password,
        jours: parseInt(jours),
        telephone,
        poste,
        salaire: parseInt(salaire),
      },
    })
      .then((res) => {
        setSnackbarMessage("L'utilisateur a été ajouté avec succès !");
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setTimeout(() => {
          handleClose();
        }, 2000);
      })
      .catch((error) => {
        // Gérer les erreurs
        setSnackbarMessage("Erreur lors de l'ajout de l'utilisateur.");
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ajout d'un utilisateur"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Ici vous pouvez ajouter des détails sur l'utilisateur.
            </DialogContentText>

            <Typography variant="h6" gutterBottom>
              Informations Personnelles
            </Typography>

            <TextField
              autoFocus
              margin="dense"
              id="prenom"
              label="Prénom"
              type="text"
              fullWidth
              required
              value={prenom}
              onChange={(event) => setPrenom(event.target.value)}
            />

            <TextField
              margin="dense"
              id="nom"
              label="Nom"
              type="text"
              fullWidth
              required
              value={nom}
              onChange={(event) => setNom(event.target.value)}
            />

            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>

            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <TextField
              margin="dense"
              id="telephone"
              label="Téléphone"
              type="tel"
              fullWidth
              value={telephone}
              onChange={(event) => setTelephone(event.target.value)}
            />

            <Typography variant="h6" gutterBottom>
              Détails de l'emploi
            </Typography>

            <TextField
              margin="dense"
              id="poste"
              label="Poste"
              type="text"
              fullWidth
              value={poste}
              onChange={(event) => setPoste(event.target.value)}
            />

            <TextField
              margin="dense"
              id="salaire"
              label="Salaire"
              type="number"
              fullWidth
              value={salaire}
              onChange={(event) => setSalaire(event.target.value)}
            />

            <TextField
              margin="dense"
              id="jours"
              label="Jours"
              type="number"
              fullWidth
              required
              value={jours}
              onChange={(event) => setJours(event.target.value)}
            />

            <Typography variant="h6" gutterBottom>
              Sécurité
            </Typography>

            <TextField
              margin="dense"
              id="password"
              label="Mot de passe"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Fermer
            </Button>
            <Button type="submit" color="primary" autoFocus disabled={loading}>
              {loading ? 'Chargement...' : 'Sauvegarder'}
            </Button>
          </DialogActions>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Dialog>
    </>
  );
}
