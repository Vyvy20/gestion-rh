import React, { useEffect, useState } from 'react';
import { UPDATE_EMPLOYE, UPDATE_PASSWORD } from '../../api/employeApi';
import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@apollo/client';

function PasswordForm({ user }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updated, setUpdated] = useState(false);

  const [update, { loading, error }] = useMutation(UPDATE_PASSWORD, {
    onCompleted: (data) => {
      setUpdated(data.changePassword);
      setTimeout(() => {
        setUpdated(false);
      }, 5000);
    },
    onError: (error) => {
      setUpdated(error.message);
      setTimeout(() => {
        setUpdated(false);
      }, 5000);
    },
  });

  const handleConfirm = () => {
    update({
      variables: {
        id: user.id,
        currentPassword: currentPassword,
        newPassword: newPassword,
      },
    });
  };

  if (loading) {
    return <Typography>loading...</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      {updated && (
        <Snackbar open={updated}>
          <Alert severity={error ? 'error' : 'success'}>{updated}</Alert>
        </Snackbar>
      )}
      <Typography variant="h6" gutterBottom>
        Changer votre mot de passe
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            autoComplete="confirm-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={handleConfirm}>
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function ProfilForm({ user, refetch = () => {} }) {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [updated, setUpdated] = useState(false);

  const [update, { loading, error }] = useMutation(UPDATE_EMPLOYE, {
    onCompleted: (data) => {
      refetch();
      setUpdated(data.updateEmploye);
      setTimeout(() => {
        setUpdated(false);
      }, 5000);
    },
  });

  useEffect(() => {
    if (user) {
      setNom(user.nom);
      setPrenom(user.prenom);
      setEmail(user.email);
      setTelephone(user.telephone);
    }
  }, [user]);

  if (loading) {
    return <Typography>loading...</Typography>;
  }

  const handleUpdate = () => {
    update({
      variables: {
        id: user.id,
        email: email,
        prenom: prenom,
        nom: nom,
        telephone: telephone,
      },
    });
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Mon profil
      </Typography>
      {updated && (
        <Snackbar open={updated}>
          <Alert severity="success">{updated}</Alert>
        </Snackbar>
      )}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error.message}
        </Typography>
      )}
      {!user ? (
        <Typography sx={{ mb: 2 }}>Vous n'êtes pas connecté</Typography>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nom"
                variant="outlined"
                fullWidth
                onChange={(e) => setNom(e.target.value)}
                value={nom}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Prénom"
                variant="outlined"
                fullWidth
                onChange={(e) => setPrenom(e.target.value)}
                value={prenom}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Adresse mail"
                variant="outlined"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Téléphone"
                variant="outlined"
                fullWidth
                onChange={(e) => setTelephone(e.target.value)}
                value={telephone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                Poste: {user.poste ? user.poste : 'Non renseigné'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">Rôle: {user.role}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                Jours restant de congé: {user.joursRestant}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" onClick={handleUpdate} sx={{ mt: 2 }}>
                {loading ? 'En Cours' : 'Mettre à jour'}
              </Button>
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  Erreur lors de la mise à jour de votre profil.
                </Typography>
              )}
            </Grid>
          </Grid>
          <PasswordForm user={user} />
        </Box>
      )}
    </Box>
  );
}
