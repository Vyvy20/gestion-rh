import React, {useContext, useState} from 'react';
import {Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Grid} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { UserContext } from '../../page/Interface';
import ProfilForm from './ProfilForm';

//Fonction pour créer une donnée test
function createData(startDateDonn, endDateDonn, status, action) {
  return { startDateDonn, endDateDonn, status, action };
}
function createData2(paystub, action2) {
  return { paystub, action2};
}

//Créer une donnée test
const rows = [
  createData('12/05/2023', '19/05/2023', 'Congé payé', 'Validé', <Box><Button color='inherit' variant="outlined">Modifier</Button> <Button color='inherit' variant="outlined">Supprimer</Button></Box>),
];

function Profil() {
  const user = useContext(UserContext);
  const fiche2 = new URL("../../images/Fiche_paie_janvier.jpg", import.meta.url)
  const [fiche, setFiche] = useState(new URL(fiche2, import.meta.url))
  const handleClick = () => {setFiche(new URL("http://localhost:3000/app/home", import.meta.url))}
  const rows2 = [
    createData2("fiche_paie_janvier_2023", <Box><Button color='inherit' variant="outlined" onClick={handleClick} href={fiche ? fiche2:!fiche2}>Voir</Button></Box>),
  ];

  if (!user) {
    return (<Typography>Vous n'etes pas connecté.</Typography>)
  }

  return(
        <Box>
			<ProfilForm />
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
            <Box>
                <Typography variant='h3'>Mes fiches de paie</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Fiche de paie</TableCell>
                        <TableCell align="left">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows2.map((row2) => (
                          <TableRow
                            key={row2.paystub}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                          <TableCell component="th" scope="row">{row2.paystub}</TableCell>
                          <TableCell align="left">{row2.action2}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}
export default Profil;