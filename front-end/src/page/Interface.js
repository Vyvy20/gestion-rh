import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Menu from "../components/Homepage/Menu"

function Interface(props) {
    return (
        <Box>
            <Menu/>
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh"}}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default Interface;