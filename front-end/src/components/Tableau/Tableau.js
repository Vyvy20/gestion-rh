import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useQuery, useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import AddEmploye from '../Modal/AddEmploye';
import { GET_EMPLOYES, DELETE_EMPLOYE } from '../../api/tableauApi';

export default function Tableau() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);

  const [deleteEmploye] = useMutation(DELETE_EMPLOYE);
  const { loading, error, data } = useQuery(GET_EMPLOYES, {
    pollInterval: 5000,
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const employes = data.getEmployes;

  const handleClickeDelete = () => {
    if (selectedRows && selectedRows.length > 0) {
      console.log('Lignes sélectionnées: ', selectedRows);
      selectedRows.forEach((userId) => handleDeleteClick(userId));
    } else {
      console.log('Aucune ligne sélectionnée');
    }
  };

  const handleClickAdd = () => {
    setOpen(true);
  };

  const handleClickEdit = (userId) => {
    alert("Modifier l'utilisateur avec l'ID : " + userId);
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
      <AddEmploye open={open} setOpen={setOpen} />
    </div>
  );
}
