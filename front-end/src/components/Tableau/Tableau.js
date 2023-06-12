import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { rows } from './row';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function Tableau() {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleClickAdd = () => {
    alert("Button ajout d'utilisateur");
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
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'email',
      headerName: 'Email',
      width: 230,
    },
    {
      field: 'telephone',
      headerName: 'Téléphone',
      type: 'number',
      width: 150,
    },
    {
      field: 'poste',
      headerName: 'Poste',
      width: 190,
    },
    {
      field: 'salaire',
      headerName: 'Salaire',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
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
        rows={rows}
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
