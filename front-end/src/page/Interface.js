import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Menu from "../components/Homepage/Menu"

export const UserContext = createContext();

function Interface(props) {
    const [user, setUser] = useState(null)

    return (
        <Box>
            <UserContext.Provider value={user}>
                <Menu setUser={setUser}/>
                <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh"}}>
                    <Outlet />
                </Box>
            </UserContext.Provider>
        </Box>
    )
}

export default Interface;