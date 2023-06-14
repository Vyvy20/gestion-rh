import React, {useState} from 'react';
import {Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Grid, MenuItem} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//Fonction pour créer une donnée test
function createData(startDateDonn, endDateDonn, status, action) {
  return { startDateDonn, endDateDonn, status, action };
}
function createData2(paystub, action2) {
  return { paystub, action2};
}

function createData3(startDateDonn2, endDateDonn2, addrEmail, status2) {
  return { startDateDonn2, endDateDonn2, addrEmail, status2 };
}

function createData4(paystub2, addrEmail2, action3) {
  return { paystub2, addrEmail2, action3 };
}

//Créer une donnée test
const rows = [
  createData('12/05/2023', '19/05/2023', 'Validé', <Box><Button color='inherit' variant="outlined">Modifier</Button> <Button color='inherit' variant="outlined">Supprimer</Button></Box>),
];

const rows3 = [
  createData3('15/07/2023', '31/07/2023', 'marie.test@anchorink.com', <Box><TextField label="Statut" variant='outlined' select><MenuItem value="validé">Validé</MenuItem><MenuItem value="refusé">Refusé</MenuItem></TextField></Box>),
];

function RhProfil() {

  const fiche2 = new URL("../../images/Fiche_paie_janvier.jpg", import.meta.url)
  const [fiche, setFiche] = useState(new URL(fiche2, import.meta.url))
  const handleClick = () => {setFiche(new URL("http://localhost:3000/app/home", import.meta.url))}
  const rows2 = [
    createData2("fiche_paie_janvier_2023", <Box><Button color='inherit' variant="outlined" onClick={handleClick} href={fiche ? fiche2:!fiche2}>Voir</Button></Box>),
  ];

  const fiche3 = new URL("../../images/Fiche_paie_mai.jpg", import.meta.url)
  const [fiche4, setFiche2] = useState(new URL(fiche3, import.meta.url))
  const handleClick2 = () => {setFiche2(new URL("http://localhost:3000/app/home", import.meta.url))}
  const rows4 = [
    createData4("fiche_paie_mai_2023", "daniel.dupont@anchorink.com", <Box><Button color='inherit' variant="outlined" onClick={handleClick2} href={fiche4 ? fiche3:!fiche3}>Voir</Button> <Button color='inherit' variant="outlined">Modifier</Button> <Button color='inherit' variant="outlined">Supprimer</Button></Box>),
  ];

  const [firstName, setFirstName] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [remainDay, setRemainDay] = useState(0)
  const [pwd, setPwd] = useState("")
  const [job, setJob] = useState("")
  const [tel, setTel] = useState("")
  const [email2, setEmail2] = useState("")

  return(
        <Box>
            <Box>
                <Typography variant='h3'>Mon profil</Typography>
                <Grid container>
                  <Grid item xs={4}>
                    <TextField label="Nom" variant="outlined" onChange={e => setName(e.target.value)}  value={name}/>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Prénom" variant="outlined" onChange={e => setFirstName(e.target.value)}  value={firstName}/>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Adresse mail" variant="outlined" onChange={e => setEmail(e.target.value)}  value={email}/>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Téléphone" variant="outlined" onChange={e => setTel(e.target.value)}  value={tel}></TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="poste" variant="outlined" onChange={e => setJob(e.target.value)}  value={job}></TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Rôle" variant="outlined" onChange={e => setRole(e.target.value)}  value={role}/>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="mot de passe" variant="outlined" onChange={e => setPwd(e.target.value)}  value={pwd}/>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Jours restant de congé" variant="outlined" onChange={e => setRemainDay(e.target.value)}  value={remainDay}/>
                  </Grid>
                </Grid>
            </Box>
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
export default RhProfil;