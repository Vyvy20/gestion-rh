import React from 'react';
import {Box, TextField, Typography} from '@mui/material';

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
                
            </Box>
            <Box>
                <Typography variant='h3'>Ma fiche de paie</Typography>
            </Box>
        </Box>
    )
}
export default Profil;