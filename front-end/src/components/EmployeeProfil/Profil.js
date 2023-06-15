import React from 'react';
import {Box, Typography} from '@mui/material';
import ProfilForm from './ProfilForm.js';
import AbsencesTable from './AbsencesTable.js';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYE } from '../../api/employeApi';


function Profil( { userId }) {  const { loading, error, data, refetch } = useQuery(GET_EMPLOYE, {
      variables: {
        employeId: userId
      }
    });

  if (loading) {
    return (<Typography>loading...</Typography>)
  }

  if(error) {
    return (<Typography>Error while fetching profile.</Typography>)
  }

  return(
        <Box>
			    <ProfilForm user={data.getEmploye} refetch={refetch}/>
          <AbsencesTable userId={userId}/>
        </Box>
    )
}

export default Profil;
