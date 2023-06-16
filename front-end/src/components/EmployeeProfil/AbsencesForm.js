import React, { useContext, useState } from 'react';
import { Box, Button, Grid, Snackbar, Alert } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useMutation } from '@apollo/client';
import { ADD_ABSENCE } from '../../api/absenceApi';
import { UserContext } from '../../page/Interface';

export default function AbsencesForm({ userId, refetch = () => {} }) {
  const { role } = useContext(UserContext);
  const [dateDebut, setDateDebut] = useState(dayjs());
  const [dateFin, setDateFin] = useState(dayjs());

  const [addAbsence, { loading, error }] = useMutation(ADD_ABSENCE);

  const handleDemande = () => {
    addAbsence({
      variables: {
        employeId: userId,
        dateDebut: dateDebut.unix() * 1000,
        dateFin: dateFin.unix() * 1000,
      },
    });
    refetch();
  };

  return (
    <Box>
      {error && (
        <Snackbar open={error}>
          <Alert severity="success">{error.message}</Alert>
        </Snackbar>
      )}
      <Grid container>
        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              required
              label="Date de début"
              value={dateDebut}
              onChange={(value) => {
                setDateDebut(value);
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              required
              label="Date de fin"
              value={dateFin}
              onChange={(value) => {
                setDateFin(value);
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            onClick={handleDemande}
            disabled={role === 'rh'}
          >
            {loading ? 'loading...' : "Demande d'absence"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
