import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { UPDATE_PASSWORD } from '../../api/employeApi';

export default function ChangePassword({
  selectedUser,
  openChangePassword,
  setOpenChangePassword,
}) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updatePassword, { data, loading, error }] =
    useMutation(UPDATE_PASSWORD);

  const handleClose = () => {
    setOpenChangePassword(false);
  };

  const handlePassword = (e) => {
    e.preventDefault();

    updatePassword({
      variables: {
        id: parseInt(selectedUser.id),
        currentPassword,
        newPassword,
      },
    })
      .then(() => {
        setCurrentPassword('');
        setNewPassword('');
        // Afficher un message de succès ou effectuer d'autres actions nécessaires
      })
      .catch((error) => {
        // Gérer les erreurs de la mutation
        console.error('Erreur lors du changement de mot de passe :', error);
      });
  };
 
  /* if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (data) return <p>Le mot de passe de l'utilisateur a bien été modifié !</p>; */
  return (
    <Dialog
      open={openChangePassword}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Changer le mot de passe</DialogTitle>
      <form onSubmit={handlePassword}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Changer le mot de passe de l'employé.
          </DialogContentText>

          <TextField
            margin="dense"
            autoFocus
            label="Mot de passe actuel"
            type="password"
            fullWidth
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />

          <TextField
            margin="dense"
            autoFocus
            label="Nouveau mot de passe"
            type="password"
            fullWidth
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
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
