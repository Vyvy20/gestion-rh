import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Profil from "../components/EmployeeProfil/Profil"
import { UserContext } from "./Interface";
import { Typography } from "@mui/material";

function Home(props) {
    const me = useContext(UserContext)
    let { id } = useParams();

    if (!me) {
        return (<Typography>Vous n'etes pas connecté.</Typography>)
      }

    return (
        <div>
            <Profil userId={id ? parseInt(id) : me ? me.id : null}/>
        </div>
    )
}

export default Home;
