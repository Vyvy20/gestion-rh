import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { UPDATE_EMPLOYES } from '../../api/employeApi';

export default function UpdateEmploye({
  selectedUser,
  openUpdate,
  setOpenUpdate,
}) {
  const [updateEmployes, { data, loading, error }] =
    useMutation(UPDATE_EMPLOYES);
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [poste, setPoste] = useState('');
  const [salaire, setSalaire] = useState('');
  const [jours, setJours] = useState('');

  useEffect(() => {
    if (selectedUser) {
      setPrenom(selectedUser.prenom);
      setNom(selectedUser.nom);
      setEmail(selectedUser.email);
      setTelephone(selectedUser.telephone);
      setPoste(selectedUser.poste);
      setSalaire(selectedUser.salaire);
      setJours(selectedUser.jours);
    }
  }, [selectedUser]);

  const handleClose = () => {
    setOpenUpdate(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    updateEmployes({
      variables: {
        updateEmployeId: parseInt(selectedUser.id),
        prenom,
        nom,
        email,
        telephone,
        poste,
        salaire,
        jours,
      },
    })
      .then(() => {
        setPrenom('');
        setNom('');
        setEmail('');
        setTelephone('');
        setPoste('');
        setSalaire('');
        setJours('');

        // Fermer le dialogue
        setOpenUpdate(false);
      })
      .catch((error) => {
        // Gérer les erreurs
        console.error("Erreur lors de la mise à jour de l'employé :", error);
      });
  };
  // Empêché d'affiche la modal
  /* if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (data) return <p>L'utilisateur a été modifié avec succès !</p>; */

  return (
    <Dialog
      open={openUpdate}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Ajout d'un utilisateur"}
      </DialogTitle>
      <form onSubmit={handleUpdate}>
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
