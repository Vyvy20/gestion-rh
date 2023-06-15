import React, { useEffect, useState } from 'react';
import { UPDATE_EMPLOYE, UPDATE_PASSWORD } from '../../api/employeApi';
import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';

function PasswordForm({user}) {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [updated, setUpdated] = useState(false)

    const [update, {loading, error }] = useMutation(UPDATE_PASSWORD, {
        onCompleted: (data) => {
            setUpdated(data.changePassword)
            setTimeout(() => {
                setUpdated(false)
            }, 5000)
        },
        onError: (error) => {
            setUpdated(error.message)
            setTimeout(() => {
                setUpdated(false)
            }, 5000) 
        }
    });

    const handleConfirm = () => {
        update({variables: {id: user.id, currentPassword: currentPassword, newPassword: newPassword}})
    }

    if (loading) {
        return (
            <Typography>loading...</Typography>
        )
    }

    return (
        <Box>
            {updated && (
                <Snackbar open={updated}>
                    <Alert severity={error ? "error" : "success"}>
                        {updated}
                    </Alert>
                </Snackbar>
            )}
            <Typography>Changer votre mot de passe</Typography>
            <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
            />
            <TextField
                label="Confirm Password"
                type="password"
                autoComplete="confirm-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}

            />
            <Button variant="outlined" onClick={handleConfirm}>Confirm</Button>
        </Box>
    )
}

export default function ProfilForm({ user, refetch = () => {} }) {
    const [prenom, setPrenom] = useState("")
    const [nom, setNom] = useState("")
    const [email, setEmail] = useState("")
    const [telephone, setTelephone] = useState("")
    const [updated, setUpdated] = useState(false)

    const [update, { loading, error }] = useMutation(UPDATE_EMPLOYE, {
        onCompleted: (data) => {
            refetch()
            setUpdated(data.updateEmploye)
            setTimeout(() => {
                setUpdated(false)
            }, 5000)
        }
    });

    useEffect(() => {
        if (user) {
            setNom(user.nom)
            setPrenom(user.prenom)
            setEmail(user.email)
            setTelephone(user.telephone)
        }
    }, [user])

    if (loading) {
        return (<Typography>loading...</Typography>)
    }

    const handleUpdate = () => {
        update({ variables: { id: user.id, email: email, prenom: prenom, nom: nom, telephone: telephone } });
    }

    return (
        <Box>
            <Typography variant='h3'>Mon profil</Typography>
            {updated && (
                <Snackbar open={updated}>
                    <Alert severity="success">
                        {updated}
                    </Alert>
                </Snackbar>
            )}
            {error && (
                <Typography>{error.message}</Typography>
            )}
            {!user && (<Typography>You are not connected</Typography>)}
            {user && (
            <Box> 
            <Grid container>
                <Grid item xs={4}>
                <TextField label="Nom" variant="outlined" onChange={e => setNom(e.target.value)}  value={nom}/>
                </Grid>
                <Grid item xs={4}>
                <TextField label="Prénom" variant="outlined" onChange={e => setPrenom(e.target.value)}  value={prenom}/>
                </Grid>
                <Grid item xs={4}>
                <TextField label="Adresse mail" variant="outlined" onChange={e => setEmail(e.target.value)}  value={email}/>
                </Grid>
                <Grid item xs={4}>
                <TextField label="Téléphone" variant="outlined" onChange={e => setTelephone(e.target.value)}  value={telephone}/>
                </Grid>
                <Grid item xs={4}>
                <Typography label="poste" variant="outlined">Poste: {user.poste ? user.poste : "Non renseigné"}</Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography label="Rôle" variant="outlined">Role: {user.role}</Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography label="Jours restant de congé" variant="outlined" >Jours restant: {user.joursRestant}</Typography>
                </Grid>
                <Grid item xs={4}>
                <Button variant="outlined" onClick={handleUpdate}>{loading ? "En Cours" : "Update"}</Button>
                {error && (
                    <Typography color="red">Error while updating your profile.</Typography>
                )}
                </Grid>
            </Grid>
            <PasswordForm user={user} />
            </Box>
        )}
      </Box>
    )


}