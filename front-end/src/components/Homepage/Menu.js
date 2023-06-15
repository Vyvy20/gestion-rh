import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { CONNECTION, DISCONNECT } from '../../api/connectionApi.js';
import { Button, Box, Paper, Toolbar, Typography, TextField, Grid} from '@mui/material';
import Image from 'mui-image'
import { UserContext } from '../../page/Interface.js';

const logoEnt = new URL("../../images/Logo.png", import.meta.url)

function Menu({ setUser }) {
    const user = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [connect, { loading, error }] = useMutation(CONNECTION, {
        onCompleted: (data) => {
            setUser(data.connect)
            localStorage.setItem("token", data.connect.token);
            localStorage.setItem("role", data.connect.role);
            localStorage.setItem("id", data.connect.id);
        }
    });
    
    const [disconnect, { loading2, error2 }] = useMutation(DISCONNECT, {
        onCompleted: () => {
            setUser()
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("id");
        }
    });

    if (loading || loading2) {
        return (
            <Typography>loading...</Typography>
        )
    }
    if (error || error2) {
        return <Typography>{error.message}</Typography>
    }

    const handleConnect = (event) => {
        event.preventDefault();
        connect({ variables: { email: email, password: pwd } });
    }

    const handleDisconnect = (event) => {
        event.preventDefault();
        disconnect();
    }

    return (

        <Box sx={
            {
                width: "100%",
            }
        }>


            <Paper elevation={4}>

                <Toolbar>

                <Grid container spacing={2} sx={{margin: 1}}>
                
                    <Grid item xs={5} >
                    
                        <Image src={logoEnt} alt='logo' width={90}/>

                    </Grid>

                        {user && (

                            <Grid item xs={5}>
                                <Typography variant="h6">Bonjour Madame/Monsieur</Typography>
                            </Grid>
                        )}
                        {!user && (
                            <Box>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <TextField required label="Email" variant="outlined" onChange={e => setEmail(e.target.value)} value={email}/>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField required label="Mot de passe" variant="outlined" onChange={e => setPwd(e.target.value)}  value={pwd}/>  
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        <Grid xs={2}>
                            <Button className='btnConnect' color='inherit' onClick={user ? handleDisconnect : handleConnect}>{user ? "Déconnexion":"Connexion"}</Button>
                        </Grid>
                    </Grid>

                </Toolbar>

            </Paper>
        
        </Box>

    )
}
export default Menu;