import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../page/Interface';
import { GET_ME, UPDATE_EMPLOYE, UPDATE_PASSWORD } from '../../api/employeApi';
import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';

function PasswordForm({me}) {
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
        update({variables: {id: me.id, currentPassword: currentPassword, newPassword: newPassword}})
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

export default function ProfilForm() {
    const user = useContext(UserContext);
    const [me, setMe] = useState(null);
    const [prenom, setPrenom] = useState("")
    const [nom, setNom] = useState("")
    const [email, setEmail] = useState("")
    const [telephone, setTelephone] = useState("")
    const [updated, setUpdated] = useState(false)
    const {data, loading, error, refetch } = useQuery(GET_ME);
    const [update, {loading2, error2}] = useMutation(UPDATE_EMPLOYE, {
        onCompleted: (data) => {
            refetch()
            setUpdated(data.updateEmploye)
            setTimeout(() => {
                setUpdated(false)
            }, 5000)
        }
    });

    useEffect(() => {
        if (data) {
            setMe(data.getMe)
            setPrenom(data.getMe.prenom)
            setNom(data.getMe.nom)
            setTelephone(data.getMe.telephone)
            setEmail(data.getMe.email)
        }
    }, [data])

    console.log(me)

    if(!user) {
        return (<Typography>You are not connected</Typography>)
    }

    if (loading) {
        return (<Typography>loading...</Typography>)
    }

    const handleUpdate = () => {
        update({ variables: { id: me.id, email: email, prenom: prenom, nom: nom, telephone: telephone } },);
    }

    return (
        <Box>
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
        {!me && (<Typography>You are not connected</Typography>)}
        {me && (
        <Box>
          <Typography variant='h3'>Mon profil</Typography>
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
              <Typography label="poste" variant="outlined">Poste: {data.getMe.poste ? data.getMe.poste : "Non renseigné"}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography label="Rôle" variant="outlined">Role: {data.getMe.role}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography label="Jours restant de congé" variant="outlined" >Jours restant: {me.joursRestant}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" onClick={handleUpdate}>{loading2 ? "En Cours" : "Update"}</Button>
              {error2 && (
                <Typography color="red">Error while updating your profile.</Typography>
              )}
            </Grid>
          </Grid>
          <PasswordForm me={me} />
        </Box>
      )}
      </Box>
    )


}