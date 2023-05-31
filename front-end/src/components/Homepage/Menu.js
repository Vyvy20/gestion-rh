import React, {useState} from 'react';
import { Button, Box, Paper, Toolbar, Typography, TextField, Grid} from '@mui/material';
import Image from 'mui-image'

const logoEnt = new URL("../../images/Logo.png", import.meta.url)

function Menu() {

    const [isConnected, setIsConnected] = useState(false)
    const [userName, setUserName] = useState("")
    const [pwd, setPwd] = useState("")
    const handleClick = () => {setIsConnected(!isConnected)}

    return (

        <Box sx={
            {
                width: "100%",
            }
        }>


            <Paper elevation={4}>

                <Toolbar>

                <Grid container spacing={2} sx={{margin: 1}}>
                
                    <Grid xs={5} >
                    
                        <Image src={logoEnt} alt='logo' width={90}/>

                    </Grid>

                        {isConnected && (

                            <Grid xs={5}>
                                <Typography variant="h6">Bonjour Madame/Monsieur</Typography>
                            </Grid>
                        )}
                        {!isConnected && (
                            <Box>
                                <Grid container>
                                    <Grid item xs={5}>
                                    <TextField required label="Nom d'utilisateur" variant="outlined" onChange={e => setUserName(e.target.value)} value={userName}/>
                                    </Grid>
                                    <Grid item xs={5}>
                                    <TextField required label="Mot de passe" variant="outlined" onChange={e => setPwd(e.target.value)}  value={pwd}/>  
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        <Grid xs={2}>
                            <Button className='btnConnect' color='inherit' onClick={handleClick}>{isConnected ? "Déconnexion":"Connexion"}</Button>
                        </Grid>
                    </Grid>

                </Toolbar>

            </Paper>
        
        </Box>

    )
}
export default Menu;