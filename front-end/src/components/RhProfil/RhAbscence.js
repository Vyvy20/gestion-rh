import React from 'react';
import {Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Grid} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//Fonction pour créer une donnée test
function createData(startDateDonn, endDateDonn, status, action) {
    return { startDateDonn, endDateDonn, status, action };
}

//Créer une donnée test
const rows = [
    createData('12/05/2023', '19/05/2023', 'Validé', <Box><Button color='inherit' variant="outlined">Modifier</Button> <Button color='inherit' variant="outlined">Supprimer</Button></Box>),
];

function RhAbscence() {
    return(
        <Box>
            <Typography variant='h3'>Mes abscences</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Date de début</TableCell>
                            <TableCell align="left">Date de fin</TableCell>
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
            </Grid>
        </Box>
    )
}
export default RhAbscence;