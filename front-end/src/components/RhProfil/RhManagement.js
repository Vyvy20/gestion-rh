import React, {useState} from 'react';
import {Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Grid, MenuItem} from '@mui/material';

function createData3(startDateDonn2, endDateDonn2, addrEmail, status2) {
    return { startDateDonn2, endDateDonn2, addrEmail, status2 };
}
  
function createData4(paystub2, addrEmail2, action3) {
    return { paystub2, addrEmail2, action3 };
}

const rows3 = [
  createData3('15/07/2023', '31/07/2023', 'marie.test@anchorink.com', <Box><TextField label="Statut" variant='outlined' select><MenuItem value="validé">Validé</MenuItem><MenuItem value="refusé">Refusé</MenuItem></TextField></Box>),
];

function RhManagement() {

  const fiche3 = new URL("../../images/Fiche_paie_mai.jpg", import.meta.url)
  const [fiche4, setFiche2] = useState(new URL(fiche3, import.meta.url))
  const handleClick2 = () => {setFiche2(new URL("http://localhost:3000/app/home", import.meta.url))}
  const rows4 = [
    createData4("fiche_paie_mai_2023", "daniel.dupont@anchorink.com", <Box><Button color='inherit' variant="outlined" onClick={handleClick2} href={fiche4 ? fiche3:!fiche3}>Voir</Button> <Button color='inherit' variant="outlined">Modifier</Button> <Button color='inherit' variant="outlined">Supprimer</Button></Box>),
  ];

  const [email2, setEmail2] = useState("")

  return (
    <Box>
      <Box>
        <Typography variant='h3'>Gestion des abscences</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Date de début</TableCell>
                <TableCell align="left">Date de fin</TableCell>
                <TableCell align="left">Adresse email</TableCell>
                <TableCell align="left">Statut</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {rows3.map((row3) => (
                  <TableRow
                  key={row3.paystub}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row3.startDateDonn2}</TableCell>
                    <TableCell align="left">{row3.endDateDonn2}</TableCell>
                    <TableCell align='left'>{row3.addrEmail}</TableCell>
                    <TableCell align='left'>{row3.status2}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <Typography variant='h3'>Gestion des fiches de paie</Typography>
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Fiche de paie</TableCell>
                <TableCell align='left'>Adresse email</TableCell>
                <TableCell align='left'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows4.map((row4) => (
                <TableRow
                key={row4.paystub2}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row4.paystub2}</TableCell>
                  <TableCell align='left'>{row4.addrEmail2}</TableCell>
                  <TableCell align="left">{row4.action3}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        <Grid container>
          <Grid item xs={4}>
            <TextField type="file" variant='outlined'>Bulletin de salaire</TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Adresse mail" variant='outlined' onChange={e => setEmail2(e.target.value)}  value={email2}></TextField>
          </Grid>
          </Grid>
        </Box>
    </Box>
  )
}
export default RhManagement