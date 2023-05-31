import React from 'react';
import { Button, Box, AppBar, Toolbar, Typography } from '@mui/material';
import { teal } from '@mui/material/colors';

const logoEnt = new URL("../../images/Logo.png", import.meta.url)
function Connect() {
    return (

        <Box sx={
            {
                marginLeft: -0.8,
                width: 1262,
                marginTop: -1,
                backgroundColor: teal["200"]
            }
        }>

            <AppBar position='static' color='transparent'>

                <Toolbar>

                    <img src={logoEnt} alt='logo' width={150} ></img>
                    <Typography className='accueil' component="div" sx={{ flexGrow: 1 }} variant="h6">Accueil</Typography>
                    <Button className='btnConnect' color='inherit'>Connexion</Button>

                </Toolbar>

            </AppBar>
        
        </Box>

    )
}
export default Connect;