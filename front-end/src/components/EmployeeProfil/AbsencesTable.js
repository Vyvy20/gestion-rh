import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import {
  GET_ABSENCE,
  VALIDATE_ABSENCE,
  DELETE_ABSENCE,
} from '../../api/absenceApi';
import { UserContext } from '../../page/Interface';
import AbsencesForm from './AbsencesForm';

function DeleteAbsence({ absenceId, onClick }) {
  // ...
}

function ValidateAbsence({ absenceId, onClick }) {
  // ...
}

export default function AbsencesTable({ userId }) {
  const me = useContext(UserContext);
  const { loading, error, data, refetch } = useQuery(GET_ABSENCE, {
    variables: { userId: userId },
  });

  if (loading) {
    return <Typography>loading...</Typography>;
  }

  if (error) {
    return <Typography>{error.message}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h3">Mes absences</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Date de début</TableCell>
              <TableCell align="left">Date de fin</TableCell>
              <TableCell align="left">Duree</TableCell>
              <TableCell align="left">Statut</TableCell>
              {me.role === 'rh' && (
                <TableCell align="left">Validation</TableCell>
              )}
              <TableCell align="left">Supprimer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.getUserAbsences.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {new Date(
                    data.getUserAbsences[index].date_debut
                  ).toISOString()}
                </TableCell>
                <TableCell align="left">
                  {new Date(data.getUserAbsences[index].date_fin).toISOString()}
                </TableCell>
                <TableCell align="left">{row.duree}</TableCell>
                <TableCell align="left">
                  {row.valide ? 'Validé' : 'Non Validé'}
                </TableCell>
                {me.role === 'rh' && (
                  <TableCell align="left">
                    <ValidateAbsence absenceId={row.id} onClick={refetch} />
                  </TableCell>
                )}
                <TableCell align="left">
                  <DeleteAbsence absenceId={row.id} onClick={refetch} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AbsencesForm userId={userId} refetch={refetch} />
    </Box>
  );
}
