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
import { ADD_EMPLOYE } from '../../api/tableauApi';

export default function AddEmploye({ open, setOpen }) {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [poste, setPoste] = useState('');
  const [salaire, setSalaire] = useState('');
  const [password, setPassword] = useState('');
  const [jours, setJours] = useState('');

  const [addEmployes, { data, loading, error }] = useMutation(ADD_EMPLOYE);

  const handleClose = () => {
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
    });
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (data) return <p>L'utilisateur a été ajouté avec succès !</p>;

  return (
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
          <Button type="submit" color="primary" autoFocus>
            Sauvegarder
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
