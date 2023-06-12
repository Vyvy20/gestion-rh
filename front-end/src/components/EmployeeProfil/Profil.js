import React from 'react';
import {Box, Button, TextField, Typography, styled, Table, TableBody, TableCell, TableContainer, TableRow, TableHead} from '@mui/material';

//Table
function createData(startDateDonn, endDateDonn, type, status, action) {
  return { startDateDonn, endDateDonn, type, status, action };
}

const rows = [
  createData('12/05/2023', '19/05/2023', 'Congé payé', 'Validé', <Button color='inherit'>Modifier</Button>),
];

function Profil() {

    return(
        <Box>
            <Box>
                <Typography variant='h3'>Mon profil</Typography>
                <TextField label="Nom d'utilisateur" variant="outlined"/>
                <TextField label="Nom" variant="outlined"/>
                <TextField label="Prénom" variant="outlined"/>
                <TextField label="Rôle" variant="outlined"/>
            </Box>
            <Box>
                <Typography variant='h3'>Mes abscences</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Date de début</TableCell>
                        <TableCell align="left">Date de fin</TableCell>
                        <TableCell align="left">Type de congé</TableCell>
                        <TableCell align="left">Statut</TableCell>
                        <TableCell align="left">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.startDateDonn}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.startDateDonn}
              </TableCell>
              <TableCell align="left">{row.endDateDonn}</TableCell>
              <TableCell align="left">{row.type}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">{row.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
                  </Table>
                </TableContainer>
            </Box>
            <Box>
                <Typography variant='h3'>Ma fiche de paie</Typography>
            </Box>
        </Box>
    )
}
export default Profil;