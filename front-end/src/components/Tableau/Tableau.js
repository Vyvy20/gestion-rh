import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useQuery, useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import AddEmploye from '../Modal/AddEmploye';
import UpdateEmploye from '../Modal/UpdateEmploye';
import {
  GET_EMPLOYES,
  DELETE_EMPLOYE,
  DELETES_EMPLOYES,
} from '../../api/tableauApi';

export default function Tableau() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [deleteEmploye] = useMutation(DELETE_EMPLOYE);
  const [deletesEmployes] = useMutation(DELETES_EMPLOYES);

  const { loading, error, data } = useQuery(GET_EMPLOYES, {
    pollInterval: 5000,
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const employes = data.getEmployes;

  const handleClickeDelete = () => {
    deletesEmployes({ variables: { ids: selectedRows } })
      .then(() => {
        alert(`Employé avec l'ID ${selectedRows} supprimé avec succès.`);
      })
      .catch((error) => {
        alert(`Erreur lors de la suppression de l'employé : ${error.message}`);
      });
  };

  const handleClickAdd = () => {
    setOpen(true);
  };

  const handleClickEdit = (userId, userData) => {
    setSelectedUser(userData);
    setOpenUpdate(true);
  };

  const handleDeleteClick = (userId) => {
    deleteEmploye({ variables: { deleteEmployeId: userId } })
      .then(() => {
        alert(`Employé avec l'ID ${userId} supprimé avec succès.`);
      })
      .catch((error) => {
        alert(`Erreur lors de la suppression de l'employé : ${error.message}`);
      });
  };

  const ActionsMenu = (params) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const userId = params.row.id;

    const handleClick = (event) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleEditClick = (e) => {
      e.stopPropagation();
      const userData = params.row;
      handleClickEdit(userId, userData);
      handleClose();
    };

    const handleDeleteRowClick = (e) => {
      e.stopPropagation();
      handleDeleteClick(userId);
      handleClose();
    };

    return (
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteRowClick}>Delete</MenuItem>
        </Menu>
      </div>
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nom', headerName: 'Nom', width: 130 },
    { field: 'prenom', headerName: 'Prénom', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'telephone', headerName: 'Téléphone', width: 130 },
    { field: 'poste', headerName: 'Poste', width: 130 },
    {
      field: 'salaire',
      headerName: 'Salaire',
      width: 130,
      valueFormatter: (params) => `${params.value} €`,
    },
    { field: 'jours', headerName: 'Jours', width: 130 },
    { field: 'joursRestant', headerName: 'Jours Restant', width: 130 },
    { field: 'joursPrit', headerName: 'Jours Prit', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => <ActionsMenu {...params} />,
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
      <UpdateEmploye
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        selectedUser={selectedUser}
      />
      <AddEmploye open={open} setOpen={setOpen} />
    </div>
  );
}
