import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { GET_EMPLOYES } from '../../api/tableauApi';

const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};

export default function Tableau() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [poste, setPoste] = useState('');
  const [salaire, setSalaire] = useState('');
  const [password, setPassword] = useState('');
  const [jours, setJours] = useState('');
  const [open, setOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_EMPLOYES, config);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur :</p>;

  console.log(data);
  const employes = data.getEmployes;

  const handleClickAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickeDelete = () => {
    if (selectedRows && selectedRows.length > 0) {
      console.log('Lignes sélectionnées: ', selectedRows);
      selectedRows.forEach((userId) => handleDeleteClick(userId));
    } else {
      console.log('Aucune ligne sélectionnée');
    }
  };

  const handleClickEdit = (userId) => {
    alert("Modifier l'utilisateur avec l'ID : " + userId);
  };

  const handleDeleteClick = (userId) => {
    alert("Supprimer l'utilisateur avec l'ID : " + userId);
  };

  const EditButton = (params) => {
    const userId = params.row.id;

    const handleEditClick = (e) => {
      console.log(userId);
      e.stopPropagation();
      handleClickEdit(userId);
    };

    return (
      <Button variant="contained" onClick={handleEditClick}>
        Edit
      </Button>
    );
  };

  const DeleteButton = (params) => {
    const userId = params.row.id;

    const handleDeleteRowClick = (e) => {
      e.stopPropagation();
      handleDeleteClick(userId);
    };

    return (
      <Button variant="contained" onClick={handleDeleteRowClick}>
        Delete
      </Button>
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nom', headerName: 'Nom', width: 130 },
    { field: 'prenom', headerName: 'Prénom', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'telephone', headerName: 'Téléphone', width: 130 },
    { field: 'poste', headerName: 'Poste', width: 130 },
    { field: 'salaire', headerName: 'Salaire', width: 130 },
    { field: 'jours', headerName: 'Jours', width: 130 },
    { field: 'joursRestant', headerName: 'Jours Restant', width: 130 },
    { field: 'joursPrit', headerName: 'Jours Prit', width: 130 },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => <EditButton {...params} />,
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => <DeleteButton {...params} />,
    },
  ];

  return (
    <div>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="contained" color="primary" onClick={handleClickAdd}>
          + Ajouter
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickeDelete}
        >
          - Supprimer sélectionnés
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ajout d'un utilisateur"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ici vous pouvez ajouter des détails sur l'utilisateur.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fermer
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>

      <DataGrid
        rows={employes}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        pageSizeOptions={[5, 10, 50]}
      />
    </div>
  );
}
