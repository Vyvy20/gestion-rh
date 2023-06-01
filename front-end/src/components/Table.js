import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { rows } from './rows';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function Table() {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleClickAdd = () => {
    alert("Button ajout d'utilisateur");
  };

  const handleClickeDelete = () => {
  console.log("les id : ",selectedRows);
 };

  const handleClickEdit = (userId) => {
    alert("Modifier l'utilisateur avec l'ID : " + userId);
  };

  const Edit = (params) => {
    const userId = params.row.id;

    const handleEditClick = () => {
      handleClickEdit(userId);
    };

    return (
      <strong>
        <Button variant="contained" onClick={handleEditClick}>
          Edit
        </Button>
      </strong>
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
    { field: 'edit', headerName: 'Edit', renderCell: Edit },
  ];

  return (
    <div>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="contained" color="primary" onClick={handleClickAdd}>
          + Ajouter
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClickeDelete}>
          - Supprimer sélectionnés
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={itm => setSelectedRows(itm)}
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
