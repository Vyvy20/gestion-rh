import React from 'react';
import {Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Grid, MenuItem} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//Table
function createData(startDateDonn, endDateDonn, type, status, action) {
  return { startDateDonn, endDateDonn, type, status, action };
}

const rows = [
  createData('12/05/2023', '19/05/2023', 'Congé payé', 'Validé', <Box><Button color='inherit' variant="outlined">Modifier</Button> <Button color='inherit' variant="outlined">Supprimer</Button></Box>),
];

//Type de vacances
const typeHol = [
  {
    value: "paidLeave",
    label: "Congé payé"
  },
  {
    value: "unpaidLeave",
    label: "Congé sans solde"
  },
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
                        <TableCell component="th" scope="row">{row.startDateDonn}</TableCell>
                        <TableCell align="left">{row.endDateDonn}</TableCell>
                        <TableCell align="left">{row.type}</TableCell>
                        <TableCell align="left">{row.status}</TableCell>
                        <TableCell align="left">{row.action}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid container>
                  <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker required label="Date de début"/>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker required label="Date de fin"/>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField required select label="Type de congé" variant="outlined">
                      {typeHol.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={3}>
                    <Button color='inherit' variant="outlined">Ajouter</Button>
                  </Grid>
                </Grid>        
            </Box>
            <Box>
                <Typography variant='h3'>Ma fiche de paie</Typography>
            </Box>
        </Box>
    )
}
export default Profil;