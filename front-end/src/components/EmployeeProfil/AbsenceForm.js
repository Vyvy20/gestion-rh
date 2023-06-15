import React, { useContext } from "react";
import { Box, Typography, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, Button } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_ABSENCE } from "../../api/absenceApi";
import { UserContext } from "../../page/Interface";

export default function AbsencesForm({userId}) {
    const me = useContext(UserContext)
    const {loading, error, data, refetch} = useQuery(GET_ABSENCE, { variables: {userId: userId}})

    if (loading) {
        return (<Typography>loading...</Typography>)
    }

    if (error) {
        return (<Typography>{error.message}</Typography>)
    }

    console.log(new Date(data.getUserAbsences[0].date_debut).toISOString())

    return (
        <Box>
          <Typography variant='h3'>Mes absences</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Date de début</TableCell>
                  <TableCell align="left">Date de fin</TableCell>
                  <TableCell align="left">Duree</TableCell>
                  <TableCell align="left">Statut</TableCell>
                  {me.role === "rh" && (
                    <TableCell align="left">Validation</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.getUserAbsences.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{new Date(data.getUserAbsences[0].date_debut).toISOString()}</TableCell>
                    <TableCell align="left">{new Date(data.getUserAbsences[0].date_fin).toISOString()}</TableCell>
                    <TableCell align="left">{row.duree}</TableCell>
                    <TableCell align="left">{row.valide ? "Validé" : "Non Validé"}</TableCell>
                    {me.role === "rh" && (
                      <TableCell align="left">
                        <Button variant="outlined" onClick={() => {}}>Valider</Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
    )
}