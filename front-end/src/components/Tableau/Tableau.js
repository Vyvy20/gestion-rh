import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import AddEmploye from '../Modal/AddEmploye';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {
  GET_EMPLOYES,
  DELETE_EMPLOYE,
  DELETES_EMPLOYES,
} from '../../api/employeApi';

export default function Tableau() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openLoadingSnackbar, setOpenLoadingSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [deleteEmployeLoading, setDeleteEmployeLoading] = useState(false);
  const [deleteEmployeError, setDeleteEmployeError] = useState(null);
  const [deletesEmployesLoading, setDeletesEmployesLoading] = useState(false);
  const [deletesEmployesError, setDeletesEmployesError] = useState(null);
  const [deleteEmployeSuccess, setDeleteEmployeSuccess] = useState(false);
  const [deletesEmployesSuccess, setDeletesEmployesSuccess] = useState(false);

  const navigate = useNavigate();

  const [deleteEmploye] = useMutation(DELETE_EMPLOYE, {
    onCompleted: () => {
      setDeleteEmployeLoading(false);
      setDeleteEmployeSuccess(true);
    },
    onError: (error) => setDeleteEmployeError(error),
  });

  const [deletesEmployes] = useMutation(DELETES_EMPLOYES, {
    onCompleted: () => {
      setDeletesEmployesLoading(false);
      setDeletesEmployesSuccess(true);
    },
    onError: (error) => setDeletesEmployesError(error),
  });

  const { loading, error, data } = useQuery(GET_EMPLOYES, {
    pollInterval: 5000,
  });

  useEffect(() => {
    if (loading) setOpenLoadingSnackbar(true);
    if (error) setOpenErrorSnackbar(true);
  }, [loading, error]);

  const employes = data ? data.getEmployes : [];

  const handleClickeDelete = () => {
    setDeletesEmployesLoading(true);
    deletesEmployes({ variables: { ids: selectedRows } });
  };

  const handleClickAdd = () => {
    setOpen(true);
  };

  const handleClickEdit = (userId) => {
    navigate(`/app/home/${userId}`);
  };

  const handleDeleteClick = (userId) => {
    setDeleteEmployeLoading(true);
    deleteEmploye({ variables: { deleteEmployeId: userId } });
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
      handleClickEdit(userId);
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
          <MenuItem onClick={handleDeleteRowClick}>Supprimer</MenuItem>
          <MenuItem onClick={handleEditClick}>Modifier</MenuItem>
        </Menu>
      </div>
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'nom', headerName: 'Nom', width: 130 },
    { field: 'prenom', headerName: 'Prénom', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'telephone', headerName: 'Téléphone', width: 100 },
    { field: 'poste', headerName: 'Poste', width: 50 },
    {
      field: 'salaire',
      headerName: 'Salaire',
      width: 70,
      valueFormatter: (params) => `${params.value} €`,
    },
    { field: 'jours', headerName: 'Jours', width: 50 },
    { field: 'joursRestant', headerName: 'Jours Restant', width: 99 },
    { field: 'joursPrit', headerName: 'Jours Prit', width: 75 },
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
        <Button variant="contained" color="error" onClick={handleClickeDelete}>
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

      <Snackbar
        open={openLoadingSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenLoadingSnackbar(false)}
      >
        <Alert onClose={() => setOpenLoadingSnackbar(false)} severity="info">
          Chargement...
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <Alert onClose={() => setOpenErrorSnackbar(false)} severity="error">
          Erreur : {error?.message}
        </Alert>
      </Snackbar>

      {/* mutaion */}

      <Snackbar
        open={deleteEmployeLoading || deletesEmployesLoading}
        autoHideDuration={6000}
        onClose={() => {
          setDeleteEmployeLoading(false);
          setDeletesEmployesLoading(false);
        }}
      >
        <Alert
          onClose={() => {
            setDeleteEmployeLoading(false);
            setDeletesEmployesLoading(false);
          }}
          severity="info"
        >
          Suppression en cours...
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!deleteEmployeError || !!deletesEmployesError}
        autoHideDuration={6000}
        onClose={() => {
          setDeleteEmployeError(null);
          setDeletesEmployesError(null);
        }}
      >
        <Alert
          onClose={() => {
            setDeleteEmployeError(null);
            setDeletesEmployesError(null);
          }}
          severity="error"
        >
          Erreur de suppression :{' '}
          {deleteEmployeError?.message || deletesEmployesError?.message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={deleteEmployeSuccess || deletesEmployesSuccess}
        autoHideDuration={6000}
        onClose={() => {
          setDeleteEmployeSuccess(false);
          setDeletesEmployesSuccess(false);
        }}
      >
        <Alert
          onClose={() => {
            setDeleteEmployeSuccess(false);
            setDeletesEmployesSuccess(false);
          }}
          severity="success"
        >
          Suppression réussie!
        </Alert>
      </Snackbar>
      <AddEmploye open={open} setOpen={setOpen} />
    </div>
  );
}
