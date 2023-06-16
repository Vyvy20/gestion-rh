import React from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';
import ProfilForm from './ProfilForm.js';
import AbsencesTable from './AbsencesTable.js';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYE } from '../../api/employeApi';

function Profil({ userId }) {
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYE, {
    variables: {
      employeId: userId,
    },
  });

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error while fetching profile.</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Divider />
          <ProfilForm user={data.getEmploye} refetch={refetch} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <AbsencesTable userId={userId} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profil;
