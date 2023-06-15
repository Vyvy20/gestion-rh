import React, {useState} from 'react';
import {Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Grid} from '@mui/material';

//Fonction pour créer une donnée test

function createData2(paystub, action2) {
  return { paystub, action2};
}

function RhProfil() {

  const fiche2 = new URL("../../images/Fiche_paie_janvier.jpg", import.meta.url)
  const [fiche, setFiche] = useState(new URL(fiche2, import.meta.url))
  const handleClick = () => {setFiche(new URL("http://localhost:3000/app/home", import.meta.url))}
  const rows2 = [
    createData2("fiche_paie_janvier_2023", <Box><Button color='inherit' variant="outlined" onClick={handleClick} href={fiche ? fiche2:!fiche2}>Voir</Button></Box>),
  ];

  const [firstName, setFirstName] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [remainDay, setRemainDay] = useState(0)
  const [pwd, setPwd] = useState("")
  const [job, setJob] = useState("")
  const [tel, setTel] = useState("")

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
                    <TextField label="Téléphone" variant="outlined" onChange={e => setTel(e.target.value)}  value={tel}/>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="poste" variant="outlined" onChange={e => setJob(e.target.value)}  value={job}/>
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
                  <Grid item xs={4}>
                    <Button color='inherit' variant="outlined">Modifier les informations</Button>
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
export default RhProfil;